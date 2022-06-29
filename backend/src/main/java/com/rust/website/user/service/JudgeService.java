package com.rust.website.user.service;

import com.rust.website.exersie.model.model.JudgeInputModel;
import com.rust.website.exersie.model.model.JudgeOutputModel;

import java.io.IOException;

public interface JudgeService {
    public JudgeOutputModel onlineJudge(JudgeInputModel inputModel) throws IOException;
}
