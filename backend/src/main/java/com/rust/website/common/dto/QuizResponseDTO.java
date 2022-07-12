package com.rust.website.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuizResponseDTO {
    private boolean pass;
    private String message;
    private List<Boolean> correctList;
}
