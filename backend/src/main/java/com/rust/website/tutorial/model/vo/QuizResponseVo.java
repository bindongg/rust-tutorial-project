package com.rust.website.tutorial.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QuizResponseVo {
    private boolean pass;
    private String message;
    private List<Boolean> correctList;
}
