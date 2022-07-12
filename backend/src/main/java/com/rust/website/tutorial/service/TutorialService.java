package com.rust.website.tutorial.service;

import com.rust.website.tutorial.model.entity.*;
import com.rust.website.common.dto.QuizResponseDTO;
import com.rust.website.common.dto.ResponseDTO;
import com.rust.website.tutorial.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@Service
@AllArgsConstructor
public class TutorialService {
    private final TutorialRepository tutorialRepository;
    private final TutorialDoneRepository tutorialDoneRepository;
    private final TutorialSubRepository tutorialSubRepository;
    private final TutorialQuizRepository tutorialQuizRepository;
    private final TutorialQuizAnswerRepository tutorialQuizAnswerRepository;

    @Transactional(readOnly = true)
    public List<Tutorial> getTutorials(String userId)
    {
        int doneCnt = tutorialDoneRepository.countByUser_id(userId);
        List<Tutorial> tutorials = tutorialRepository.getTutorials(doneCnt + 1);
        return tutorials;
    }

    @Transactional(readOnly = true)
    public TutorialSub getTutorialSub(int number, int subNumber)
    {
        int id = tutorialRepository.findByNumber(number).getId();
        return tutorialSubRepository.findByTutorial_idAndNumber(id, subNumber);
    }

    @Transactional(readOnly = true)
    public TutorialQuiz getTutorialQuiz(int number)
    {
        return tutorialRepository.findByNumber(number).getTutorialQuiz();
    }

    @Transactional
    public QuizResponseDTO postTutorialQuizAnswer(List<Integer> userAnswers, int number, String userId)
    {
        int tutorialId = tutorialRepository.findByNumber(number).getTutorialQuiz().getId();
        List<TutorialQuizAnswer> answers = tutorialQuizAnswerRepository.findByTutorialQuiz_idOrderByIdAsc(tutorialId);
        List<Boolean> correctList = new ArrayList<Boolean>();
        Boolean isCorrect = true;
        for (int i = 0; i < answers.size(); ++i) {
            if (userAnswers.get(i).equals(answers.get(i).getAnswer())) {
                correctList.add(true);
                isCorrect = isCorrect && true;
            } else {
                correctList.add(false);
                isCorrect = isCorrect && false;
            }
        }

        String message = null;
        if (isCorrect) {
            TutorialDone newDone = tutorialDoneRepository.findByUser_idAndTutorialId(userId, tutorialId);
            if (newDone == null) {
                tutorialDoneRepository.insert(userId, tutorialId);
            }
            message = "맞았습니다!";
        } else {
            message = "틀렸습니다";
        }

        return new QuizResponseDTO(isCorrect, message, correctList);
    }

    @Transactional
    public ResponseDTO<String> addTutorial(Tutorial newTutorial)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<String>(HttpStatus.OK.value(), "추가가 완료되었습니다.");
        if (tutorialRepository.findByNumber(newTutorial.getNumber()) == null) {
            tutorialRepository.save(newTutorial);
        }
        else
        {
            responseDTO.setData("추가에 실패하였습니다.");
            responseDTO.setCode(HttpStatus.CONFLICT.value());
        }
        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> updateTutorial(Tutorial newTutorial, int number)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<String>(HttpStatus.OK.value(), "변경이 완료되었습니다.");
        Tutorial tutorial = tutorialRepository.findByNumber(number);
        tutorial.setName(newTutorial.getName());
        tutorial.setNumber(newTutorial.getNumber());

        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> deleteTutorial(int number)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<String>(HttpStatus.OK.value(), "삭제가 완료되었습니다.");
        tutorialDoneRepository.deleteByTutorial_id(tutorialRepository.findByNumber(number).getId());
        tutorialRepository.deleteByNumber(number);

        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> addTutorialSub(TutorialSub newTutorialSub, int number)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<String>(HttpStatus.OK.value(), "추가가 완료되었습니다.");
        Tutorial tutorial = tutorialRepository.findByNumber(number);
        if (tutorialSubRepository.findByTutorial_idAndNumber(tutorial.getId(), newTutorialSub.getNumber()) == null)
        {
            newTutorialSub.setTutorial(tutorial);
            tutorialSubRepository.save(newTutorialSub);
        }
        else {
            responseDTO.setData("추가에 실패하였습니다.");
            responseDTO.setCode(HttpStatus.CONFLICT.value());
        }

        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> updateTutorialSub(TutorialSub newTutorialSub, int number, int subNumber)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<String>(HttpStatus.OK.value(), "변경이 완료되었습니다.");
        int tutorial_id = tutorialRepository.findByNumber(number).getId();
        TutorialSub tutorialSub = tutorialSubRepository.findByTutorial_idAndNumber(tutorial_id, subNumber);
        tutorialSub.setName(newTutorialSub.getName());
        tutorialSub.setNumber(newTutorialSub.getNumber());
        tutorialSub.setContent(newTutorialSub.getContent());

        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> deleteTutorialSub(int number, int subNumber)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<String>(HttpStatus.OK.value(), "삭제가 완료되었습니다.");
        Tutorial tutorial = tutorialRepository.findByNumber(number);
        tutorial.getTutorialSubs().removeIf(sub -> sub.getNumber() == subNumber);
        tutorialSubRepository.deleteByTutorial_idAndNumber(tutorial.getId(), subNumber);

        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> addTutorialQuiz(int number, TutorialQuiz newTutorialQuiz, List<Integer> answers)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<String>(HttpStatus.OK.value(), "추가가 완료되었습니다.");
        Tutorial tutorial = tutorialRepository.findByNumber(number);
        if (tutorialQuizRepository.findByTutorial_id(tutorial.getId()) == null)
        {
            newTutorialQuiz.setTutorial(tutorial);
            tutorialQuizRepository.save(newTutorialQuiz);
            IntStream.range(0, answers.size())
                    .mapToObj(i -> TutorialQuizAnswer.builder()
                                    .answer(answers.get(i))
                                    .number(i + 1)
                                    .tutorialQuiz(newTutorialQuiz)
                                    .build()
                    )
                    .forEach(newTutorialQuizAnswer -> tutorialQuizAnswerRepository.save(newTutorialQuizAnswer));
        }
        else
        {
            responseDTO.setData("추가에 실패하였습니다.");
            responseDTO.setCode(HttpStatus.CONFLICT.value());
        }
        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> updateTutorialQuiz(int number, TutorialQuiz newTutorialQuiz, List<Integer> answers)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<String>(HttpStatus.OK.value(),"변경이 완료되었습니다.");
        Tutorial tutorial = tutorialRepository.findByNumber(number);
        TutorialQuiz tutorialQuiz = tutorialQuizRepository.findByTutorial_id(tutorial.getId());
        tutorialQuiz.setContent(newTutorialQuiz.getContent());
        tutorialQuiz.setName(newTutorialQuiz.getName());
        tutorialQuiz.setDate(newTutorialQuiz.getDate());

        tutorialQuizAnswerRepository.deleteByTutorialQuiz_id(tutorialQuiz.getId());
        tutorialQuizAnswerRepository.flush();
        IntStream.range(0, answers.size())
                .mapToObj(i -> TutorialQuizAnswer.builder()
                        .answer(answers.get(i))
                        .number(i + 1)
                        .tutorialQuiz(tutorialQuiz)
                        .build()
                )
                .forEach(newTutorialQuizAnswer -> tutorialQuizAnswerRepository.save(newTutorialQuizAnswer));
        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> deleteTutorialQuiz(int number)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<String>(HttpStatus.OK.value(),"삭제가 완료되었습니다.");
        Tutorial tutorial = tutorialRepository.findByNumber(number);
        tutorial.setTutorialQuiz(null);
        tutorialQuizRepository.deleteByTutorial_id(tutorial.getId());

        return responseDTO;
    }
}