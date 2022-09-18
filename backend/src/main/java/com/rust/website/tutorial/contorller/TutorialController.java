package com.rust.website.tutorial.contorller;

import com.rust.website.common.config.jwt.JwtProperties;
import com.rust.website.common.config.jwt.JwtUtil;
import com.rust.website.exercise.model.myEnum.ExerciseTag;
import com.rust.website.tutorial.model.dto.TutorialSubDTO;
import com.rust.website.tutorial.model.entity.*;
import com.rust.website.tutorial.model.dto.AnswersDTO;
import com.rust.website.tutorial.model.dto.CompileInputDTO;
import com.rust.website.tutorial.model.dto.CompileOutputDTO;
import com.rust.website.common.dto.QuizResponseDTO;
import com.rust.website.common.dto.ResponseDTO;
import com.rust.website.tutorial.service.CompileService;
import com.rust.website.tutorial.service.TutorialService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
    public ResponseDTO<String> executeTutorialCode(@RequestBody CompileInputDTO compileInputDTO)
    {
        String output = null;
        try {
            CompileOutputDTO compileOutputDTOModel = compileService.onlineCompile(compileInputDTO);
            output = (compileOutputDTOModel.getStdOut().length() != 0) ? compileOutputDTOModel.getStdOut() : compileOutputDTOModel.getStdErr();
        } catch (IOException e) {
            e.printStackTrace();
            output = "IOException Error";
        }
        return new ResponseDTO<String>(HttpStatus.OK.value(), output);
    }

    @PostMapping("tutorial")
    public ResponseDTO<String> addTutorial(@RequestBody Map<String, Object> map/*Tutorial tutorial*/)
    {
        Tutorial tutorial = Tutorial.builder()
                .number(Integer.parseInt(map.get("number").toString()))
                .name(map.get("name").toString())
                .build();
        tutorialService.addTutorial(tutorial);
        List<String> list = (List<String>) map.get("checkedList");
        if(!list.isEmpty())
        {
            list.forEach((elem)->{
                TutorialRelation tutorialRelation = TutorialRelation.builder()
                        .tutorial(tutorial)
                        .exerciseTag(ExerciseTag.valueOf(elem))
                        .build();
                tutorialService.addTutorialRelation(tutorialRelation);
            });
        }
        return new ResponseDTO<>(HttpStatus.OK.value(),"추가 완료");
    }

    @PatchMapping("tutorial/{id}")
    public ResponseDTO<String> updateTutorial(@RequestBody Map<String,Object> map, @PathVariable int id)
    {
        List<String> list =(List<String>) map.get("checkedList");
        tutorialService.updateTutorial(Integer.parseInt(map.get("number").toString()), map.get("name").toString(), list, id);
        return new ResponseDTO<>(HttpStatus.OK.value(), "ok");
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

    @GetMapping("/test/tuto/{id}")
    public List<TutorialDone> test(@PathVariable String id)
    {
        return tutorialService.test(id);
    }
}
