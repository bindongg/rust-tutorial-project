package com.rust.website.compile.service;

import com.rust.website.compile.model.dto.CompileInputDTO;
import com.rust.website.compile.model.dto.CompileOutputDTO;
import com.rust.website.compile.model.model.ExecutionConstraints;
import com.rust.website.exercise.model.entity.ExerciseTestcase;
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
import java.time.Instant;
import java.util.*;
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

        makeDirAndCodefile(code, lang, input, cwd);
        ProcessBuilder processBuilder = new ProcessBuilder()
                                            .command(makeCompileCommand(lang, memoryLimit, uuid, cwd))
                                            .directory(cwd);
        HashMap<String, String> compileResult = compileCodeExecution(processBuilder, timeLimit,cwd);
        if (compileResult.get("success").equals("false"))
        {
            return CompileOutputDTO.builder()
                    .stdOut(compileResult.get("stdout"))
                    .time(-1000)
                    .build();
        }
        processBuilder = new ProcessBuilder()
                                .command(makeRunCommand(lang, memoryLimit, uuid, cwd))
                                .directory(cwd);
        CompileOutputDTO result = runCodeExecution(processBuilder, timeLimit, uuid);

        removeFiles(cwd);
        return result;
    }

    public HashMap<String, String> exerciseCompile(CompileInputDTO compileInputDTO, ExecutionConstraints constraints, List<ExerciseTestcase> exerciseTestcases) {
        final String code = compileInputDTO.getCode();
        final String lang = compileInputDTO.getLanguage().getLang();
        String input = compileInputDTO.getStdIn();
        final long memoryLimit = constraints.getMemoryLimit();
        final long timeLimit = constraints.getTimeLimit();
        final String uuid = UUID.randomUUID().toString();
        final File cwd = new File(System.getProperty("user.dir") + "/docker/code/" + uuid);

        makeDirAndCodefile(code, lang, input, cwd);
        ProcessBuilder processBuilder = new ProcessBuilder()
                .command(makeCompileCommand(lang, memoryLimit, uuid, cwd))
                .directory(cwd);
        HashMap<String, String> compileResult = compileCodeExecution(processBuilder, timeLimit,cwd);
        if (compileResult.get("success").equals("false"))
        {
            return compileResult;
        }

        int index = 0;
        long time = 0;
        for (; index < exerciseTestcases.size(); ++index) {
            processBuilder = new ProcessBuilder()
                    .command(makeRunCommand(lang, memoryLimit, uuid + index, cwd))
                    .directory(cwd);
            ExerciseTestcase tempTestcase = exerciseTestcases.get(index);
            input = tempTestcase.getInput();
            makeDirAndCodefile(code, lang, input, cwd);

            CompileOutputDTO output = runCodeExecution(processBuilder, timeLimit, uuid + index);
            if (!output.getStdOut().equals(tempTestcase.getOutput())) { break; }
            time = Math.max(time, output.getTime());
        }
        compileResult.put("index", String.valueOf(index));
        compileResult.put("time", String.valueOf(time));

        removeFiles(cwd);
        return compileResult;
    }

    private HashMap<String, String> compileCodeExecution(final ProcessBuilder processBuilder, final long maxExecutionTime, final File cwd) {
        final ExecutorService service = Executors.newSingleThreadExecutor();
        HashMap<String, String> result = new HashMap<>();
        try {
            final Future<HashMap<String, String>> executionContext = service.submit(( ) -> {
                // start the process
                final Process process = processBuilder.start();
                String stdout = collectProcessStdOutOutput(process);
                String stderr = collectProcessStdErrOutput(process);
                HashMap<String, String> processResult = new HashMap<>();
                if (stderr.length() == 0)
                {
                    processResult.put("stdout", stdout);
                    processResult.put("success", "true");
                }
                else
                {
                    processResult.put("stdout", stderr);
                    processResult.put("success", "false");
                }
                return processResult;
            });
            result = executionContext.get(maxExecutionTime, TimeUnit.MILLISECONDS);
        } catch (final TimeoutException e) {
            result.put("stdout", "Compile time took to long");
            result.put("success", "false");
        } catch (final Exception e) {
            throw new RuntimeException(e);
        } finally {
            service.shutdown();
            if (result.get("success").equals("false"))
            {
                removeFiles(cwd);
            }
        }
        return result;
    }




    /**
     * this function help to monitor if each code submission run under a given time contraints
     *
     * @param processBuilder
     * @param maxExecutionTime
     * @return
     */
    private CompileOutputDTO runCodeExecution(final ProcessBuilder processBuilder, final long maxExecutionTime, final String name) {
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
            compileOutputDTO.setStdOut(executionContext.get(maxExecutionTime, TimeUnit.MILLISECONDS));
            compileOutputDTO.setTime(getRunningTime(name));
        } catch (final TimeoutException e) {
            compileOutputDTO.setStdOut("Calculation took to long");
            compileOutputDTO.setTime(-2000);
        } catch (final Exception e) {
            throw new RuntimeException(e);
        } finally {
            service.shutdown();
            killDockerPs(name);
        }
        return compileOutputDTO;
    }

    @SneakyThrows
    private long getRunningTime(String uuid) {
        ProcessBuilder processBuilder = new ProcessBuilder("bash", "-c", "echo $(docker inspect --format='{{.State.StartedAt}}' " + uuid + ")");
        Process process = processBuilder.start();
        String stdout = collectProcessStdOutOutput(process).trim();
        long startTime = Date.from(Instant.parse(stdout)).getTime();

        processBuilder = new ProcessBuilder("bash", "-c", "echo $(docker inspect --format='{{.State.FinishedAt}}' " + uuid + ")");
        process = processBuilder.start();
        stdout = collectProcessStdOutOutput(process).trim();
        long endTime = Date.from(Instant.parse(stdout)).getTime();

        return Math.max(endTime - startTime, 0L);
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
        Path codePath = Paths.get(cwd.toString() + "/Code." + lang);
        Path inputPath = Paths.get(cwd.toString() + "/in.in");
        Files.writeString(codePath, code, StandardCharsets.UTF_8);
        input = input == null ? "" : input;
        Files.writeString(inputPath, input, StandardCharsets.UTF_8);
    }

    private String[] makeCompileCommand(String lang, long memoryLimit, String uuid, File cwd) {
        String docker = "docker run --rm ";
        String nameTag = "--name \"" + uuid + "\" ";
        String memoryTag = "-m \"" + memoryLimit + "m\" --memory-swap \"" + memoryLimit + "m\" ";
        String vTag = "-v \"" + cwd + "\":/code ";
        String wTag = "-w /code ";
        String command = docker + nameTag + memoryTag + vTag + wTag;
        switch (lang) {
            case "rs":
                command += "rust /bin/sh -c \"rustc -o Code.exe Code.rs\"";
                break;
            case "cpp":
                command += "cpp /bin/sh -c \"g++ -Wall Code.cpp -o a\"";
                break;
            case "py":
                command += "python /bin/sh -c \"\"";
                break;
            case "java":
                command += "java /bin/sh -c \"javac Code.java\"";
                break;
        }

        String[] commands = {"bash", "-c", command};
        return commands;
    }

    private String[] makeRunCommand(String lang, long memoryLimit, String name, File cwd) {
        String docker = "docker run ";
        String nameTag = "--name \"" + name + "\" ";
        String memoryTag = "-m \"" + memoryLimit + "m\" --memory-swap \"" + memoryLimit + "m\" ";
        String vTag = "-v \"" + cwd + "\":/code ";
        String wTag = "-w /code ";
        String command = docker + nameTag + memoryTag + vTag + wTag;
        switch (lang) {
            case "rs":
                command += "rust /bin/sh -c \"./Code.exe < in.in >&1 | tee\"";
                break;
            case "cpp":
                command += "cpp /bin/sh -c \"./a < in.in >&1 | tee\"";
                break;
            case "py":
                command += "python python3 -u Code.py < in.in >&1 | tee";
                break;
            case "java":
                command += "java /bin/sh -c \"java Code < in.in >&1 | tee\"";
                break;
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
