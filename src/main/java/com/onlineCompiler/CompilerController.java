package com.onlineCompiler;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Timer;
import java.util.TimerTask;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.onlineCompiler.Model.InputModel;
import com.onlineCompiler.Model.OutputModel;

@Controller
public class CompilerController {	
	static final String RUST_COMPILE = ".\\rust_compile\\stable-x86_64-pc-windows-msvc\\bin\\rustc --out-dir .\\rust_compile\\temp_code\\";
	static final String CODE_PATH = ".\\rust_compile\\temp_code\\";
	static int processNumber = 0;
	
	@ResponseBody
	@RequestMapping(value = "/compile", method = RequestMethod.POST)	
	public String createProduct(InputModel inputModel, Model model) {		
		try {
			OutputModel outputModel = onlineCompile(inputModel);
				return (outputModel.getStdOut().length() != 0) ? outputModel.getStdOut() : outputModel.getStdErr();			
		} catch (IOException e) {
			e.printStackTrace();
			return "IOException Error";
		}
	}

	private OutputModel onlineCompile(InputModel inputModel) throws IOException {
		processNumber = (processNumber + 1) % 10000;
		String fileName = "temp" + processNumber;		

		OutputModel outputModel = new OutputModel();
		try {
			FileWriter myWriter = new FileWriter(CODE_PATH + fileName + "_code.rs");
			myWriter.write(inputModel.getCode());
			System.out.println("[Process Number " + processNumber + "]");
			System.out.println("[Input Code]");
			System.out.println(inputModel.getCode());
			myWriter.close();
			
			System.out.println("[Input StdIn]");
			System.out.println(inputModel.getStdIn());
			myWriter = new FileWriter(CODE_PATH + fileName + "_input.txt");
			if (inputModel.getStdIn() != null) {
				myWriter.write(inputModel.getStdIn());
			}	
			myWriter.close();

			System.out.println("Successfully wrote to the file.");
		} catch (IOException e) {
			System.out.println("An error occurred.");
			e.printStackTrace();
		}

		Process p = runRustCode(fileName);
		outputModel.setStdErr(streamReaderOutput(p.getErrorStream()));
		outputModel.setStdOut(streamReaderOutput(p.getInputStream()));
		deleteCodeFiles(fileName);
		
		System.out.println("[Output StdOut]");
		System.out.println(outputModel.getStdOut());
		System.out.println("[Output StdErr]");
		System.out.println(outputModel.getStdErr());		
		return outputModel;
	}
	
	private void deleteCodeFiles(String fileName) throws IOException {
		ProcessBuilder builder = new ProcessBuilder("cmd.exe", "/c", "del " + CODE_PATH + fileName + "_code.exe "
				+ CODE_PATH + fileName + "_code.pdb "+ CODE_PATH + fileName + "_code.rs "+ CODE_PATH + fileName + "_input.txt ");
		builder.start();
	}
	
	private Process runRustCode(String fileName) throws IOException {
		ProcessBuilder builder = new ProcessBuilder("cmd.exe", "/c", RUST_COMPILE + " " + CODE_PATH + fileName + "_code.rs &&"
				+ CODE_PATH + fileName + "_code");		
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
