package com.rust.website.compile.model.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ExecutionConstraints {
    private long memoryLimit;
    private long timeLimit;
}
