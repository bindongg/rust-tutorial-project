package com.rust.compile.controller;

import com.rust.compile.model.JudgeInputModel;
import com.rust.compile.model.JudgeOutputModel;
import com.rust.compile.service.JudgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

@Controller
public class JudgeController {
    @Autowired
    private JudgeService judgeService;

    @ResponseBody
    @RequestMapping(value="/judge", method = RequestMethod.POST)
    public String onlineJudge(JudgeInputModel inputModel) {
        try {
            JudgeOutputModel judgeOutputModel = judgeService.onlineJudge(inputModel);
            return (judgeOutputModel.getStdErr().length() != 0) ? judgeOutputModel.getStdErr() : judgeOutputModel.getAnswer();
        } catch (IOException e) {
            e.printStackTrace();
            return "IOException Error";
        }
    }

}