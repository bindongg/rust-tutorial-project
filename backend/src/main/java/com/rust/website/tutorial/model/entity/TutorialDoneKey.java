package com.rust.website.tutorial.model.entity;

import com.rust.website.user.model.entity.User;

import java.io.Serializable;

public class TutorialDoneKey implements Serializable {
    private User user;
    private Tutorial tutorial;
}
