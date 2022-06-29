package com.rust.website.user.service;

import com.rust.website.exercise.model.model.JudgeInputModel;
import com.rust.website.exercise.model.model.JudgeOutputModel;

import java.io.IOException;

public interface JudgeService {
    public JudgeOutputModel onlineJudge(JudgeInputModel inputModel) throws IOException;
}
