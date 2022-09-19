package com.rust.website.compile.service;

import com.rust.website.compile.model.dto.CompileInputDTO;
import com.rust.website.compile.model.dto.CompileOutputDTO;
import com.rust.website.compile.model.model.ExecutionConstraints;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.*;

@Service
public class CompileService {
    public CompileOutputDTO onlineCompile(CompileInputDTO compileInputDTO, ExecutionConstraints constraints) {
        final String code = compileInputDTO.getCode();
        final String lang = compileInputDTO.getLanguage().getLang();
        final String input = compileInputDTO.getStdIn();
        final long memoryLimit = constraints.getMemoryLimit();
        final long timeLimit = constraints.getTimeLimit();
        final String uuid = UUID.randomUUID().toString();
        final File cwd = new File(System.getProperty("user.dir") + "/docker/code/" + uuid);
        final String[] cmd = {"docker", code, input , lang, "" + memoryLimit};

        makeDirAndCodefile(code, lang, input, cwd);
        ProcessBuilder processBuilder = new ProcessBuilder()
                                            .directory(cwd)
                                            .command(makeCommand(lang, memoryLimit, uuid, cwd));
        return monitoredCommandExecution(processBuilder, timeLimit, uuid, cwd);
    }


    /**
     * this function help to monitor if each code submission run under a given time contraints
     *
     * @param processBuilder
     * @param maxExecutionTime
     * @return
     */
    private CompileOutputDTO monitoredCommandExecution(final ProcessBuilder processBuilder, final long maxExecutionTime, final String uuid, final File cwd) {
        final ExecutorService service = Executors.newSingleThreadExecutor();
        CompileOutputDTO compileOutputDTO = new CompileOutputDTO();
        try {
            final Future<String> executionContext = service.submit(( ) -> {
                // start the process
                final Process process = processBuilder.start();
                String stdout = collectProcessStdOutOutput(process);
                String stderr = collectProcessStdErrOutput(process);
                return stdout.length() != 0 ? stdout : stderr;
            });
            long startTime = System.currentTimeMillis();
            compileOutputDTO.setStdOut(executionContext.get(maxExecutionTime, TimeUnit.MILLISECONDS));
            compileOutputDTO.setTime(System.currentTimeMillis() - startTime);
        } catch (final TimeoutException e) {
            compileOutputDTO.setStdOut("Calculation took to long");
            compileOutputDTO.setTime(-1000);
            killDockerPs(uuid);
        } catch (final Exception e) {
            throw new RuntimeException(e);
        } finally {
            service.shutdown();
            removeFiles(cwd);
        }
        return compileOutputDTO;
    }

    @SneakyThrows
    private void removeFiles(File cwd) {
        ProcessBuilder processBuilder = new ProcessBuilder("bash", "-c", "sudo rm -rf " + cwd.toString());
        processBuilder.start();
    }

    @SneakyThrows
    private void killDockerPs(String uuid) {
        ProcessBuilder processBuilder = new ProcessBuilder("bash", "-c", "sudo docker rm -f " + uuid);
        processBuilder.start();
    }

    @SneakyThrows
    private void makeDirAndCodefile(String code, String lang, String input, File cwd) {
        cwd.mkdirs();
        Path codePath = Paths.get(cwd.toString() + "/file." + lang);
        Path inputPath = Paths.get(cwd.toString() + "/in.in");
        Files.writeString(codePath, code, StandardCharsets.UTF_8);
        Files.writeString(inputPath, input, StandardCharsets.UTF_8);
    }

    private String[] makeCommand(String lang, long memoryLimit, String uuid, File cwd) {
        String docker = "docker run --rm ";
        String nameTag = "--name \"" + uuid + "\" ";
        String memoryTag = "-m \"" + memoryLimit + "m\" --memory-swap \"" + memoryLimit + "m\" ";
        String vTag = "-v \"" + cwd + "\":/code ";
        String wTag = "-w /code ";
        String command = docker + nameTag + memoryTag + vTag + wTag;
        switch (lang) {
            case "rs":
                command += "rust /bin/sh -c \"rustc -o file.exe file.rs && ./file.exe < in.in >&1 | tee\"";
                break;
            case "cpp":
                command += "cpp /bin/sh -c \"g++ -Wall file.cpp -o a && ./a < in.in >&1 | tee\"";
                break;
            case "py":
                command += "python python3 -u file.py < in.in >&1 | tee";
        }

        String[] commands = {"bash", "-c", command};
        return commands;
    }

    /**
     * collect the output (stdout) of the given process
     *
     * @param process
     * @return
     */
    @SneakyThrows
    private String collectProcessStdOutOutput(final Process process) {
        // collect output rom the standard output
        return  getOutputFromStream(process.getInputStream());
    }

    /**
     * collect the output (stderr) of the given process
     * @param process
     * @return
     */
    @SneakyThrows
    private String collectProcessStdErrOutput(final Process process) {
        // collect output rom the standard output error
        return getOutputFromStream(process.getErrorStream());
    }

    @SneakyThrows
    private String getOutputFromStream(InputStream  inputStream) {

        BufferedReader stdoutReader =
                new BufferedReader(new InputStreamReader( inputStream ));
        StringBuilder builder = new StringBuilder();
        String line = null;
        while ((line = stdoutReader.readLine()) != null) {
            builder.append(line);
            builder.append(System.getProperty("line.separator"));
        }
        return builder.toString().trim();
    }



    /**
     * parsed the process output to return an understandable output
     * @param output
     * @return
     */
    private String parseOutput(String output){
        return output;
    }
}
