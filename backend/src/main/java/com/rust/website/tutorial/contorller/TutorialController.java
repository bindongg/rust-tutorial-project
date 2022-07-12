package com.rust.website.tutorial.contorller;

import com.rust.website.tutorial.model.entity.Tutorial;
import com.rust.website.tutorial.model.entity.TutorialQuiz;
import com.rust.website.tutorial.model.entity.TutorialSub;
import com.rust.website.tutorial.model.model.CompileInput;
import com.rust.website.tutorial.model.model.CompileOutput;
import com.rust.website.common.dto.QuizResponseDTO;
import com.rust.website.tutorial.model.model.QuizAndAnswer;
import com.rust.website.common.dto.ResponseDTO;
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
    public ResponseDTO<List<Tutorial>> getTutorialMainPage(@PathVariable String userId)
    {
        List<Tutorial> tutorials = tutorialService.getTutorials(userId);
        return new ResponseDTO<List<Tutorial>>(HttpStatus.OK.value(), tutorials);
    }

    @GetMapping("/tutorial/{number}/{subNumber}")
    public ResponseDTO<TutorialSub> getTutorialSub(@PathVariable int number, @PathVariable int subNumber)
    {
        TutorialSub sub = tutorialService.getTutorialSub(number, subNumber);
        return new ResponseDTO<TutorialSub>(HttpStatus.OK.value(), sub);
    }

    @GetMapping("tutorial/quiz/{number}")
    public ResponseDTO<TutorialQuiz> getTutorialQuiz(@PathVariable int number)
    {
        TutorialQuiz quiz = tutorialService.getTutorialQuiz(number);
        return new ResponseDTO<TutorialQuiz>(HttpStatus.OK.value(), quiz);
    }

    @PostMapping("tutorial/quiz/{number}/{userId}")
    public ResponseDTO<QuizResponseDTO> postTutorialQuizAnswer(@RequestBody QuizAndAnswer quizAndAnswer, @PathVariable int number, @PathVariable String userId)
    {
        QuizResponseDTO quizResponseDTO = tutorialService.postTutorialQuizAnswer(quizAndAnswer.getAnswers(), number , userId);
        return new ResponseDTO<QuizResponseDTO>(HttpStatus.OK.value(), quizResponseDTO);
    }

    @GetMapping("tutorial/compile")
    public ResponseDTO<String> executeTutorialCode(@RequestBody CompileInput compileInput)
    {
        String output = null;
        try {
            CompileOutput compileOutputModel = compileService.onlineCompile(compileInput);
            output = (compileOutputModel.getStdOut().length() != 0) ? compileOutputModel.getStdOut() : compileOutputModel.getStdErr();
        } catch (IOException e) {
            e.printStackTrace();
            output = "IOException Error";
        }
        return new ResponseDTO<String>(HttpStatus.OK.value(), output);
    }

    @PostMapping("tutorial/add")
    public ResponseDTO<String> addTutorial(@RequestBody Tutorial tutorial)
    {
        return tutorialService.addTutorial(tutorial);
    }

    @PatchMapping("tutorial/update/{number}")
    public ResponseDTO<String> updateTutorial(@RequestBody Tutorial tutorial, @PathVariable int number)
    {
        return tutorialService.updateTutorial(tutorial, number);
    }

    @DeleteMapping("tutorial/delete/{number}")
    public ResponseDTO<String> deleteTutorial(@PathVariable int number)
    {
        return tutorialService.deleteTutorial(number);
    }

    @PostMapping("tutorial/{number}/sub/add")
    public ResponseDTO<String> addTutorialSub(@RequestBody TutorialSub tutorialSub, @PathVariable int number)
    {
        return tutorialService.addTutorialSub(tutorialSub, number);
    }

    @PatchMapping("tutorial/{number}/sub/update/{subNumber}")
    public ResponseDTO<String> updateTutorialSub(@RequestBody TutorialSub tutorialSub, @PathVariable int number, @PathVariable int subNumber)
    {
        return tutorialService.updateTutorialSub(tutorialSub, number, subNumber);
    }

    @DeleteMapping("tutorial/{number}/sub/delete/{subNumber}")
    public ResponseDTO<String> deleteTutorialSub(@PathVariable int number, @PathVariable int subNumber)
    {
        return tutorialService.deleteTutorialSub(number, subNumber);
    }

    @PostMapping("tutorial/{number}/quiz/add")
    public ResponseDTO<String> addTutorialQuiz(@RequestBody QuizAndAnswer quizAndAnswer, @PathVariable int number)
    {
        TutorialQuiz quiz = TutorialQuiz.builder()
                .name(quizAndAnswer.getName())
                .content(quizAndAnswer.getContent())
                .build();
        return tutorialService.addTutorialQuiz(number, quiz, quizAndAnswer.getAnswers());
    }

    @PatchMapping("tutorial/{number}/quiz/update")
    public ResponseDTO<String> updateTutorialQuiz(@RequestBody QuizAndAnswer quizAndAnswer, @PathVariable int number)
    {
        TutorialQuiz quiz = TutorialQuiz.builder()
                .name(quizAndAnswer.getName())
                .content(quizAndAnswer.getContent())
                .build();
        return tutorialService.updateTutorialQuiz(number, quiz, quizAndAnswer.getAnswers());
    }

    @DeleteMapping("tutorial/{number}/quiz/delete")
    public ResponseDTO<String> deleteTutorialQuiz(@PathVariable int number)
    {
        return tutorialService.deleteTutorialQuiz(number);
    }

}
