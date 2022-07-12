package com.rust.website.exercise.model.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JudgeOutput {
    private String stdOut;
    private String stdErr;
    private String answer;
}
