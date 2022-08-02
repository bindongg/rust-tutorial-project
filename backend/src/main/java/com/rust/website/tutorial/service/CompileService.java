package com.rust.website.tutorial.service;

import com.rust.website.tutorial.model.dto.CompileInputDTO;
import com.rust.website.tutorial.model.dto.CompileOutputDTO;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.Timer;
import java.util.TimerTask;

@Service
public class CompileService {
    private static final String CODE_PATH = ".\\online_compile\\";
    private static int processNumber = 0;

    public CompileOutputDTO onlineCompile(CompileInputDTO compileInputDTOModel) throws IOException {
        processNumber = (processNumber + 1) % 100000;
        String fileName = new String("temp" + processNumber);

        CompileOutputDTO compileOutputDTOModel = new CompileOutputDTO();
        try {
            FileWriter myWriter = new FileWriter(CODE_PATH + fileName + "_code.rs");
            myWriter.write(compileInputDTOModel.getCode());
            myWriter.close();

            myWriter = new FileWriter(CODE_PATH + fileName + "_input.txt");
            if (compileInputDTOModel.getStdIn() != null) {
                myWriter.write(compileInputDTOModel.getStdIn());
            }
            myWriter.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        Process p = runRustCode(fileName);
        compileOutputDTOModel.setStdErr(streamReaderOutput(p.getErrorStream()));
        compileOutputDTOModel.setStdOut(streamReaderOutput(p.getInputStream()));
        deleteCodeFiles(fileName);

        return compileOutputDTOModel;
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
        String line = null;
        StringBuilder output = new StringBuilder();
        while (true) {
            line = r.readLine();
            if (line == null) {	break; }
            output.append(line).append(" \n");
        }
        return output.toString().trim();
    }
}
