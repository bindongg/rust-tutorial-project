package com.rust.website.tutorial.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompileOutputDTO {
	private String stdOut;
	private String stdErr;
}
