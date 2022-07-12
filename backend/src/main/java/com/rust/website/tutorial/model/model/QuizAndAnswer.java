package com.rust.website.tutorial.model.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizAndAnswer {
    private String name;
    private String content;
    private List<Integer> answers;
}
