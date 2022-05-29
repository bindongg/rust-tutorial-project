package com.rust.compile.service;

import com.rust.compile.model.JudgeInputModel;
import com.rust.compile.model.JudgeOutputModel;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.Timer;
import java.util.TimerTask;

@Service
public class JudegeServiceImpl implements JudgeService {
    static private int processNumber = 0;
    static private final String CODE_PATH = ".\\online_judge\\temp_code\\";
    static private final String TC_PATH = ".\\online_judge\\questions\\q";

    @Override
    public JudgeOutputModel onlineJudge(JudgeInputModel inputModel) throws IOException {
        processNumber = (processNumber + 1) % 100000;
        String fileName = new String("temp" + processNumber);

        JudgeOutputModel outputModel = new JudgeOutputModel();
        try {
            FileWriter myWriter = new FileWriter(CODE_PATH + fileName + "_code.rs");
            myWriter.write(inputModel.getCode());
            System.out.println("[Process Number " + processNumber + "]");
            System.out.println("[Input Code]");
            System.out.println(inputModel.getCode());
            myWriter.close();
            System.out.println("Successfully wrote to the file.");

            Process p = runRustCode(fileName, inputModel.getQuestionNum());
            outputModel.setStdErr(streamReaderOutput(p.getErrorStream()));
            outputModel.setStdOut(streamReaderOutput(p.getInputStream()));
            System.out.println("[Output StdOut]");
            System.out.println(outputModel.getStdOut());
            System.out.println("[Output StdErr]");
            System.out.println(outputModel.getStdErr());

            if (outputModel.getStdOut().length() != 0) {
                myWriter = new FileWriter(CODE_PATH + fileName + "_output.out");
                myWriter.write(outputModel.getStdOut());
                myWriter.close();
                if (isCorrectAnswer(fileName, inputModel.getQuestionNum())) {
                    outputModel.setAnswer("맞았습니다!");
                }
                else { outputModel.setAnswer("틀렸습니다!"); }
            }
            else { outputModel.setAnswer("틀렸습니다!");}

            deleteCodeFiles(fileName);

        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }

        return outputModel;
    }

    private void deleteCodeFiles(String fileName) throws IOException {
        ProcessBuilder builder = new ProcessBuilder("cmd.exe", "/c", "del " + CODE_PATH + fileName + "_code.exe "
                + CODE_PATH + fileName + "_code.pdb "+ CODE_PATH + fileName + "_code.rs "+ CODE_PATH + fileName + "_output.out ");
        builder.start();
    }

    private Process runRustCode(String fileName, int questionNum) throws IOException {
        ProcessBuilder builder = new ProcessBuilder("cmd.exe", "/c", "rustc -o " + CODE_PATH + fileName + "_code.exe "
                + CODE_PATH + fileName + "_code.rs && " + CODE_PATH + fileName + "_code");
        File input = new File(TC_PATH + questionNum + "\\0.in");
        builder.redirectInput(input);
        Process p = builder.start();

        Timer timer = new Timer();
        TimerTask timerTask = new TimerTask() {
            @Override
            public void run() {
                ProcessBuilder builder = new ProcessBuilder("cmd.exe", "/c", "taskkill /im " + fileName + "_code.exe /f");
                try {
                    builder.start();
                } catch(IOException e) {
                    e.printStackTrace();
                }
            }
        };
        timer.schedule(timerTask, 5000);

        return p;
    }

    private static String streamReaderOutput(InputStream is) throws IOException {
        BufferedReader r = new BufferedReader(new InputStreamReader(is));
        String line;
        String output="";
        while (true) {
            line = r.readLine();
            if (line == null) {	break; }
            output = output + line + " \n";
        }
        return output;
    }

    private boolean isCorrectAnswer(String fileName, int questionNum) throws IOException {
        File tc = new File(CODE_PATH + fileName + "_output.out");
        File answer = new File(TC_PATH + questionNum + "\\0.out");

        BufferedReader reader = new BufferedReader(new FileReader(tc));
        BufferedReader reader2 = new BufferedReader(new FileReader(answer));

        String data = null;
        String data2 = null;
        boolean isCorrect = true;
        while (true) {
            data = reader.readLine();
            data2 = reader2.readLine();
            if (data == null || data2 == null) {
                if (data != null || data2 != null) { isCorrect = false; }
                break;
            }
            if (!data.equals(data2)) {
                isCorrect = false;
                break;
            }
        }
        reader.close();
        reader2.close();

        return isCorrect;
    }
}
