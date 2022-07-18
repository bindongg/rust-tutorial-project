package com.rust.website.tutorial.contorller;

import com.rust.website.tutorial.model.entity.Tutorial;
import com.rust.website.tutorial.model.entity.TutorialQuiz;
import com.rust.website.tutorial.model.entity.TutorialSub;
import com.rust.website.tutorial.model.model.Answers;
import com.rust.website.tutorial.model.model.CompileInput;
import com.rust.website.tutorial.model.model.CompileOutput;
import com.rust.website.common.dto.QuizResponseDTO;
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

    @GetMapping("/tutorial/sub/{subId}")
    public ResponseDTO<TutorialSub> getTutorialSub(@PathVariable int subId)
    {
        TutorialSub sub = tutorialService.getTutorialSub(subId);
        return new ResponseDTO<TutorialSub>(HttpStatus.OK.value(), sub);
    }

    @GetMapping("tutorial/quiz/{quizId}")
    public ResponseDTO<TutorialQuiz> getTutorialQuiz(@PathVariable int quizId)
    {
        TutorialQuiz quiz = tutorialService.getTutorialQuiz(quizId);
        return new ResponseDTO<TutorialQuiz>(HttpStatus.OK.value(), quiz);
    }

    @PostMapping("tutorial/quiz/{id}/{userId}")
    public ResponseDTO<QuizResponseDTO> postTutorialQuizAnswer(@RequestBody List<Integer> answers, @PathVariable int id, @PathVariable String userId)
    {
        QuizResponseDTO quizResponseDTO = tutorialService.postTutorialQuizAnswer(answers, id , userId);
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

    @PostMapping("tutorial")
    public ResponseDTO<String> addTutorial(@RequestBody Tutorial tutorial)
    {
        return tutorialService.addTutorial(tutorial);
    }

    @PatchMapping("tutorial/{id}")
    public ResponseDTO<String> updateTutorial(@RequestBody Tutorial tutorial, @PathVariable int id)
    {
        return tutorialService.updateTutorial(tutorial, id);
    }

    @DeleteMapping("tutorial/{id}")
    public ResponseDTO<String> deleteTutorial(@PathVariable int id)
    {
        return tutorialService.deleteTutorial(id);
    }

    @PostMapping("tutorial/{id}/sub")
    public ResponseDTO<String> addTutorialSub(@RequestBody TutorialSub tutorialSub, @PathVariable int id)
    {
        return tutorialService.addTutorialSub(tutorialSub, id);
    }

    @PatchMapping("tutorial/sub/{subId}")
    public ResponseDTO<String> updateTutorialSub(@RequestBody TutorialSub tutorialSub, @PathVariable int subId)
    {
        return tutorialService.updateTutorialSub(tutorialSub, subId);
    }

    @DeleteMapping("tutorial/sub/{subId}")
    public ResponseDTO<String> deleteTutorialSub(@PathVariable int subId)
    {
        return tutorialService.deleteTutorialSub(subId);
    }

    @PostMapping("tutorial/{id}/quiz")
    public ResponseDTO<String> addTutorialQuiz(@RequestBody TutorialQuiz quiz, @PathVariable int id)
    {
        return tutorialService.addTutorialQuiz(id, quiz);
    }

    @PatchMapping("tutorial/quiz/{quizId}")
    public ResponseDTO<String> updateTutorialQuiz(@RequestBody TutorialQuiz quiz, @PathVariable int quizId)
    {
        return tutorialService.updateTutorialQuiz(quizId, quiz);
    }

    @DeleteMapping("tutorial/quiz/{quizId}")
    public ResponseDTO<String> deleteTutorialQuiz(@PathVariable int quizId)
    {
        return tutorialService.deleteTutorialQuiz(quizId);
    }

}
