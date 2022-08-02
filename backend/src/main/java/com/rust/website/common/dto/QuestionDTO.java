package com.rust.website.common.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class QuestionDTO {
    private int id;
    private String title;
    private String content;
    private String userid;
    private boolean done;
    private Timestamp time;
}
