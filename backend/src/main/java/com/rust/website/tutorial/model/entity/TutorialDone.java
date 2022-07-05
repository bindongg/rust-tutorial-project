package com.rust.website.tutorial.model.entity;

import com.rust.website.user.model.entity.User;

import java.sql.Timestamp;

public class TutorialDone {

    private int id;

    private User user; //foreign key

    private Tutorial tutorial; //foreign key

    private Timestamp date;
}
