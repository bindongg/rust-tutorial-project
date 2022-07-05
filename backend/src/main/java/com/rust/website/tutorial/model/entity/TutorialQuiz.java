package com.rust.website.tutorial.model.entity;

import java.sql.Timestamp;

public class TutorialQuiz {

    private int id;

    private String content;

    private Tutorial tutorial; //foreign key

    private Timestamp date;
}
