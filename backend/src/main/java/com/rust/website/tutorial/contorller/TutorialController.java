package com.rust.website.tutorial.contorller;

import com.rust.website.tutorial.model.entity.Tutorial;
import com.rust.website.tutorial.model.entity.TutorialQuiz;
import com.rust.website.tutorial.model.entity.TutorialSub;
import com.rust.website.tutorial.model.model.CompileInput;
import com.rust.website.tutorial.model.model.CompileOutput;
import com.rust.website.tutorial.model.vo.QuizResponseVo;
import com.rust.website.tutorial.model.model.QuizAnswers;
import com.rust.website.tutorial.model.vo.ResponseVo;
import com.rust.website.tutorial.service.CompileService;
import com.rust.website.tutorial.service.TutorialService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
public class TutorialController {

    private final TutorialService tutorialService;
    private final CompileService compileService;

    @GetMapping("/tutorial/{userId}")
    public ResponseVo<List<Tutorial>> getTutorialMainPage(@PathVariable String userId)
    {
        List<Tutorial> tutorials = tutorialService.getTutorials(userId);
        return new ResponseVo<List<Tutorial>>(HttpStatus.OK.value(), tutorials);
    }

    @GetMapping("/tutorial/{id}/{subId}")
    public ResponseVo<TutorialSub> getTutorialSub(@PathVariable int id, @PathVariable int subId)
    {
        TutorialSub sub = tutorialService.getTutorialSub(id, subId);
        return new ResponseVo<TutorialSub>(HttpStatus.OK.value(), sub);
    }

    @GetMapping("tutorial/quiz/{id}")
    public ResponseVo<TutorialQuiz> getTutorialQuiz(@PathVariable int id)
    {
        TutorialQuiz quiz = tutorialService.getTutorialQuiz(id);
        return new ResponseVo<TutorialQuiz>(HttpStatus.OK.value(), quiz);
    }

    @PostMapping("tutorial/quiz/{id}/{userId}")
    public ResponseVo<QuizResponseVo> postTutorialQuizAnswer(@RequestBody QuizAnswers userQuizAnswers, @PathVariable int id, @PathVariable String userId)
    {
        QuizResponseVo quizResponseVo = tutorialService.postTutorialQuizAnswer(userQuizAnswers.getAnswers(), id , userId);
        return new ResponseVo<QuizResponseVo>(HttpStatus.OK.value(), quizResponseVo);
    }

    @PostMapping("tutorial/compile")
    public ResponseVo<String> executeTutorialCode(@RequestBody CompileInput compileInput)
    {
        String output = null;
        try {
            CompileOutput compileOutputModel = compileService.onlineCompile(compileInput);
            output = (compileOutputModel.getStdOut().length() != 0) ? compileOutputModel.getStdOut() : compileOutputModel.getStdErr();
        } catch (IOException e) {
            e.printStackTrace();
            output = "IOException Error";
        }
        return new ResponseVo<String>(HttpStatus.OK.value(), output);
    }

    @PostMapping("tutorial/add")
    public ResponseVo<String> addTutorial(@RequestBody Tutorial tutorial)
    {
        return tutorialService.addTutorial(tutorial);
    }

}
