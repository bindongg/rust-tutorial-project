package com.rust.compile.model;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.sql.Timestamp;

public class TutorialSub {

    private int id;

    private String name;

    private String content;

    @ManyToOne
    @JoinColumn(name = "tutorialId")
    private Tutorial tutorial; //foreign key

    private Timestamp date;
}
