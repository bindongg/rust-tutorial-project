package com.rust.website.exercise.controller;

import com.rust.website.exercise.model.model.JudgeInputModel;
import com.rust.website.exercise.model.model.JudgeOutputModel;
import com.rust.website.exercise.service.JudegeService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

@Controller
@AllArgsConstructor
public class JudgeController {

    private final JudegeService judgeService;

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
