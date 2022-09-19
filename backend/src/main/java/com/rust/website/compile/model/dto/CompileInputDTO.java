package com.rust.website.compile.model.dto;

import com.rust.website.compile.model.myEnum.Language;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CompileInputDTO {
	private String code="";
	private String stdIn="";
	private Language language;
}
