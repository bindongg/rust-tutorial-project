package com.rust.website.tutorial.model.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompileOutput {
	
	private String stdOut;
	private String stdErr;
	

}
