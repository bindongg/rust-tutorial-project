package com.rust.compile.model;

import java.sql.Timestamp;

public class TutorialQuiz {

    private int id;

    private String content;

    private Tutorial tutorial; //foreign key

    private Timestamp date;
}
