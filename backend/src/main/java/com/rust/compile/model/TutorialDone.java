package com.rust.compile.model;

import java.sql.Timestamp;

public class TutorialDone {

    private int id;

    private User user; //foreign key

    private Tutorial tutorial; //foreign key

    private Timestamp date;
}
