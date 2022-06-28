package com.rust.compile.model;

import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.sql.Timestamp;
import java.util.List;
public class Tutorial {

    private int id;

    private String name;

    @OneToMany(mappedBy = "tutorial", fetch = FetchType.EAGER)
    private List<TutorialSub> subTutorial;

    private TutorialQuiz quiz;

    private Timestamp date;
}
