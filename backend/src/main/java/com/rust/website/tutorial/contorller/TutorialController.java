package com.rust.website.tutorial.contorller;

import com.rust.website.tutorial.model.entity.Tutorial;
import com.rust.website.tutorial.model.entity.TutorialQuiz;
import com.rust.website.tutorial.model.entity.TutorialQuizAnswer;
import com.rust.website.tutorial.model.entity.TutorialSub;
import com.rust.website.tutorial.model.model.CompileInput;
import com.rust.website.tutorial.model.model.CompileOutput;
import com.rust.website.tutorial.model.vo.QuizResponseVo;
import com.rust.website.tutorial.model.model.QuizAndAnswer;
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

    @GetMapping("/tutorial/{number}/{subNumber}")
    public ResponseVo<TutorialSub> getTutorialSub(@PathVariable int number, @PathVariable int subNumber)
    {
        TutorialSub sub = tutorialService.getTutorialSub(number, subNumber);
        return new ResponseVo<TutorialSub>(HttpStatus.OK.value(), sub);
    }

    @GetMapping("tutorial/quiz/{number}")
    public ResponseVo<TutorialQuiz> getTutorialQuiz(@PathVariable int number)
    {
        TutorialQuiz quiz = tutorialService.getTutorialQuiz(number);
        return new ResponseVo<TutorialQuiz>(HttpStatus.OK.value(), quiz);
    }

    @PostMapping("tutorial/quiz/{number}/{userId}")
    public ResponseVo<QuizResponseVo> postTutorialQuizAnswer(@RequestBody QuizAndAnswer quizAndAnswer, @PathVariable int number, @PathVariable String userId)
    {
        QuizResponseVo quizResponseVo = tutorialService.postTutorialQuizAnswer(quizAndAnswer.getAnswers(), number , userId);
        return new ResponseVo<QuizResponseVo>(HttpStatus.OK.value(), quizResponseVo);
    }

    @GetMapping("tutorial/compile")
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

    @PatchMapping("tutorial/update/{number}")
    public ResponseVo<String> updateTutorial(@RequestBody Tutorial tutorial, @PathVariable int number)
    {
        return tutorialService.updateTutorial(tutorial, number);
    }

    @DeleteMapping("tutorial/delete/{number}")
    public ResponseVo<String> deleteTutorial(@PathVariable int number)
    {
        return tutorialService.deleteTutorial(number);
    }

    @PostMapping("tutorial/{number}/sub/add")
    public ResponseVo<String> addTutorialSub(@RequestBody TutorialSub tutorialSub, @PathVariable int number)
    {
        return tutorialService.addTutorialSub(tutorialSub, number);
    }

    @PatchMapping("tutorial/{number}/sub/update/{subNumber}")
    public ResponseVo<String> updateTutorialSub(@RequestBody TutorialSub tutorialSub, @PathVariable int number, @PathVariable int subNumber)
    {
        return tutorialService.updateTutorialSub(tutorialSub, number, subNumber);
    }

    @DeleteMapping("tutorial/{number}/sub/delete/{subNumber}")
    public ResponseVo<String> deleteTutorialSub(@PathVariable int number, @PathVariable int subNumber)
    {
        return tutorialService.deleteTutorialSub(number, subNumber);
    }

    @PostMapping("tutorial/{number}/quiz/add")
    public ResponseVo<String> addTutorialQuiz(@RequestBody QuizAndAnswer quizAndAnswer, @PathVariable int number)
    {
        TutorialQuiz quiz = TutorialQuiz.builder()
                .name(quizAndAnswer.getName())
                .content(quizAndAnswer.getContent())
                .build();
        return tutorialService.addTutorialQuiz(number, quiz, quizAndAnswer.getAnswers());
    }

    @PatchMapping("tutorial/{number}/quiz/update")
    public ResponseVo<String> updateTutorialQuiz(@RequestBody QuizAndAnswer quizAndAnswer, @PathVariable int number)
    {
        TutorialQuiz quiz = TutorialQuiz.builder()
                .name(quizAndAnswer.getName())
                .content(quizAndAnswer.getContent())
                .build();
        return tutorialService.updateTutorialQuiz(number, quiz, quizAndAnswer.getAnswers());
    }

    @DeleteMapping("tutorial/{number}/quiz/delete")
    public ResponseVo<String> deleteTutorialQuiz(@PathVariable int number)
    {
        return tutorialService.deleteTutorialQuiz(number);
    }

}
