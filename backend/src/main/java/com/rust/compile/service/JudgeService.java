package com.rust.compile.service;

import com.rust.compile.model.JudgeInputModel;
import com.rust.compile.model.JudgeOutputModel;

import java.io.IOException;

public interface JudgeService {
    public JudgeOutputModel onlineJudge(JudgeInputModel inputModel) throws IOException;
}
