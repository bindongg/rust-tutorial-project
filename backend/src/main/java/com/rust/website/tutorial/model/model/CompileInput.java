package com.rust.website.tutorial.model.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CompileInput {
	private String code;
	private String stdIn;
}
