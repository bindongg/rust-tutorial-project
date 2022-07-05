package com.rust.website.user.service;

import com.rust.website.tutorial.model.model.CompileInputModel;
import com.rust.website.tutorial.model.model.CompileOutputModel;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.Timer;
import java.util.TimerTask;

@Service
public class CompileServiceImpl implements CompileService {
    private static final String CODE_PATH = ".\\online_compile\\";
    private static int processNumber = 0;
    @Override
    public CompileOutputModel onlineCompile(CompileInputModel compileInputModel) throws IOException {
        processNumber = (processNumber + 1) % 100000;
        String fileName = new String("temp" + processNumber);

        CompileOutputModel compileOutputModel = new CompileOutputModel();
        try {
            FileWriter myWriter = new FileWriter(CODE_PATH + fileName + "_code.rs");
            myWriter.write(compileInputModel.getCode());
            System.out.println("[Process Number " + processNumber + "]");
            System.out.println("[Input Code]");
            System.out.println(compileInputModel.getCode());
            myWriter.close();

            System.out.println("[Input StdIn]");
            System.out.println(compileInputModel.getStdIn());
            myWriter = new FileWriter(CODE_PATH + fileName + "_input.txt");
            if (compileInputModel.getStdIn() != null) {
                myWriter.write(compileInputModel.getStdIn());
            }
            myWriter.close();

            System.out.println("Successfully wrote to the file.");
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }

        Process p = runRustCode(fileName);
        compileOutputModel.setStdErr(streamReaderOutput(p.getErrorStream()));
        compileOutputModel.setStdOut(streamReaderOutput(p.getInputStream()));
        deleteCodeFiles(fileName);

        System.out.println("[Output StdOut]");
        System.out.println(compileOutputModel.getStdOut());
        System.out.println("[Output StdErr]");
        System.out.println(compileOutputModel.getStdErr());
        return compileOutputModel;
    }

    private void deleteCodeFiles(String fileName) throws IOException {
        ProcessBuilder builder = new ProcessBuilder("cmd.exe", "/c", "del " + CODE_PATH + fileName + "_code.exe "
                + CODE_PATH + fileName + "_code.pdb "+ CODE_PATH + fileName + "_code.rs "+ CODE_PATH + fileName + "_input.txt ");
        builder.start();
    }

    private Process runRustCode(String fileName) throws IOException {
        ProcessBuilder builder = new ProcessBuilder("cmd.exe", "/c", "rustc -o " + CODE_PATH + fileName + "_code.exe "
                + CODE_PATH + fileName + "_code.rs && " + CODE_PATH + fileName + "_code");
        File input = new File(CODE_PATH + fileName + "_input.txt");
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
}
