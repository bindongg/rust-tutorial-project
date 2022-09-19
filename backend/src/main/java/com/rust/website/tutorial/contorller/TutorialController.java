package com.rust.website.tutorial.contorller;

import com.rust.website.common.config.jwt.JwtProperties;
import com.rust.website.common.config.jwt.JwtUtil;
import com.rust.website.compile.model.model.ExecutionConstraints;
import com.rust.website.tutorial.model.dto.TutorialSubDTO;
import com.rust.website.tutorial.model.entity.Tutorial;
import com.rust.website.tutorial.model.entity.TutorialQuiz;
import com.rust.website.tutorial.model.entity.TutorialSub;
import com.rust.website.tutorial.model.dto.AnswersDTO;
import com.rust.website.compile.model.dto.CompileInputDTO;
import com.rust.website.compile.model.dto.CompileOutputDTO;
import com.rust.website.common.dto.QuizResponseDTO;
import com.rust.website.common.dto.ResponseDTO;
import com.rust.website.compile.service.CompileService;
import com.rust.website.tutorial.service.TutorialService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
@AllArgsConstructor
public class TutorialController {

    private final TutorialService tutorialService;
    private final CompileService compileService;

    @GetMapping("/tutorial")
    public ResponseDTO<List<Tutorial>> getTutorialMainPage(HttpServletRequest request)
    {
        String userId = JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING), JwtProperties.CLAIM_NAME);
        String userRole = JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING), JwtProperties.CLAIM_NAME2);
        List<Tutorial> tutorials = null;
        if (userRole.equals("ROLE_ADMIN") || userRole.equals("ROLE_MANAGER"))
        {
            tutorials = tutorialService.getAllTutorials();
        }
        else
        {
            tutorials = tutorialService.getUserTutorials(userId);
        }

        return new ResponseDTO<List<Tutorial>>(HttpStatus.OK.value(), tutorials);
    }

    @GetMapping("/tutorial/{id}/sub/{subId}")
    public ResponseDTO<TutorialSubDTO> getTutorialSub(@PathVariable int id, @PathVariable int subId)
    {
        TutorialSubDTO tutorialSubDTO = TutorialSubDTO.builder()
                .sub(tutorialService.getTutorialSub(subId))
                .nextSub(tutorialService.getNextTutorialSub(id, subId))
                .preSub(tutorialService.getPreTutorialSub(id, subId))
                .build();
        return new ResponseDTO<>(HttpStatus.OK.value(), tutorialSubDTO);
    }

    @GetMapping("tutorial/quiz/{id}")
    public ResponseDTO<TutorialQuiz> getTutorialQuiz(@PathVariable int id)
    {
        TutorialQuiz quiz = tutorialService.getTutorialQuiz(id);
        return new ResponseDTO<TutorialQuiz>(HttpStatus.OK.value(), quiz);
    }

    @PostMapping("tutorial/quiz/{id}")
    public ResponseDTO<QuizResponseDTO> postTutorialQuizAnswer(@RequestBody AnswersDTO answersDTO, @PathVariable int id, HttpServletRequest request)
    {
        String userId = JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING), JwtProperties.CLAIM_NAME);
        QuizResponseDTO quizResponseDTO = tutorialService.postTutorialQuizAnswer(answersDTO.getAnswers(), id , userId);
        return new ResponseDTO<QuizResponseDTO>(HttpStatus.OK.value(), quizResponseDTO);
    }

    @PostMapping("tutorial/compile")
    public ResponseDTO<CompileOutputDTO> executeTutorialCode(@RequestBody CompileInputDTO compileInputDTO)
    {
        CompileOutputDTO output = null;
        ExecutionConstraints constraints = ExecutionConstraints.builder()
                .memoryLimit(64)
                .timeLimit(10000)
                .build();
        output = compileService.onlineCompile(compileInputDTO, constraints);
        return new ResponseDTO<>(HttpStatus.OK.value(), output);
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
