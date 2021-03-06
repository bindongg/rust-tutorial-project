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
import java.util.Optional;
import java.util.stream.IntStream;

@Service
@AllArgsConstructor
public class TutorialService {
    private final TutorialRepository tutorialRepository;
    private final TutorialDoneRepository tutorialDoneRepository;
    private final TutorialSubRepository tutorialSubRepository;
    private final TutorialQuizRepository tutorialQuizRepository;
    private final TutorialQuizQuestionRepository tutorialQuizQuestionRepository;

    @Transactional(readOnly = true)
    public List<Tutorial> getTutorials(String userId)
    {
        int doneCnt = tutorialDoneRepository.countByUser_id(userId);
        List<Tutorial> tutorials = tutorialRepository.getTutorials(doneCnt + 1);
        return tutorials;
    }

    @Transactional(readOnly = true)
    public TutorialSub getTutorialSub(int subId)
    {
        return tutorialSubRepository.findById(subId).get();
    }

    @Transactional(readOnly = true)
    public TutorialQuiz getTutorialQuiz(int quizId)
    {
        return tutorialQuizRepository.findById(quizId).get();
    }

    @Transactional
    public QuizResponseDTO postTutorialQuizAnswer(List<Integer> userAnswers, int id, String userId)
    {
        Tutorial tutorial = tutorialRepository.findByNumber(id).get();
        int quizId = tutorial.getTutorialQuiz().getId();
        List<TutorialQuizQuestion> answers = tutorialQuizQuestionRepository.findByTutorialQuiz_idOrderByIdAsc(quizId);
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
            Optional<TutorialDone> newDone = tutorialDoneRepository.findByUser_idAndTutorialId(userId, id);
            if (!newDone.isPresent()) {
                tutorialDoneRepository.insert(userId, id);
            }
            message = "???????????????!";
        } else {
            message = "???????????????";
        }

        return new QuizResponseDTO(isCorrect, message, correctList);
    }

    @Transactional
    public ResponseDTO<String> addTutorial(Tutorial newTutorial)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<String>(HttpStatus.OK.value(), "????????? ?????????????????????.");
        tutorialRepository.save(newTutorial);

        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> updateTutorial(Tutorial newTutorial, int id)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<String>(HttpStatus.OK.value(), "????????? ?????????????????????.");
        Tutorial tutorial = tutorialRepository.findById(id).get();
        tutorial.setName(newTutorial.getName());
        tutorial.setNumber(newTutorial.getNumber());

        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> deleteTutorial(int id)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<String>(HttpStatus.OK.value(), "????????? ?????????????????????.");
        tutorialDoneRepository.deleteByTutorial_id(id);
        tutorialRepository.deleteById(id);

        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> addTutorialSub(TutorialSub newTutorialSub, int id)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<String>(HttpStatus.OK.value(), "????????? ?????????????????????.");
        newTutorialSub.setTutorial(tutorialRepository.findById(id).get());
        tutorialSubRepository.save(newTutorialSub);

        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> updateTutorialSub(TutorialSub newTutorialSub, int subId)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<String>(HttpStatus.OK.value(), "????????? ?????????????????????.");
        TutorialSub tutorialSub = tutorialSubRepository.findById(subId).get();
        tutorialSub.setName(newTutorialSub.getName());
        tutorialSub.setNumber(newTutorialSub.getNumber());
        tutorialSub.setContent(newTutorialSub.getContent());

        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> deleteTutorialSub(int subId)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<String>(HttpStatus.OK.value(), "????????? ?????????????????????.");
        tutorialSubRepository.deleteById(subId);

        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> addTutorialQuiz(int id, TutorialQuiz newTutorialQuiz)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<String>(HttpStatus.OK.value(), "????????? ?????????????????????.");
        Tutorial tutorial = tutorialRepository.findById(id).get();
        if (tutorial.getTutorialQuiz() == null)
        {
            newTutorialQuiz.setTutorial(tutorial);
            List<TutorialQuizQuestion> tutorialQuizQuestions = newTutorialQuiz.getTutorialQuizQuestions();
            IntStream.range(0, tutorialQuizQuestions.size())
                    .forEach(i -> {
                        TutorialQuizQuestion newQuestion = tutorialQuizQuestions.get(i);
                        newQuestion.setNumber(i+1);
                        newQuestion.setTutorialQuiz(newTutorialQuiz);
                    });
            tutorialQuizRepository.save(newTutorialQuiz);
        }
        else
        {
            responseDTO.setData("????????? ?????????????????????.");
            responseDTO.setCode(HttpStatus.CONFLICT.value());
        }
        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> updateTutorialQuiz(int quizId, TutorialQuiz newTutorialQuiz)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<String>(HttpStatus.OK.value(),"????????? ?????????????????????.");
        TutorialQuiz tutorialQuiz = tutorialQuizRepository.findById(quizId).get();
        tutorialQuiz.setName(newTutorialQuiz.getName());


        tutorialQuizQuestionRepository.deleteByTutorialQuiz_id(quizId);
        tutorialQuizQuestionRepository.flush();
        List<TutorialQuizQuestion> tutorialQuizQuestions = newTutorialQuiz.getTutorialQuizQuestions();
        IntStream.range(0, tutorialQuizQuestions.size())
                .forEach(i -> {
                    TutorialQuizQuestion newQuestion = tutorialQuizQuestions.get(i);
                    newQuestion.setNumber(i+1);
                    newQuestion.setTutorialQuiz(tutorialQuiz);
                    tutorialQuizQuestionRepository.save(newQuestion);
                });

        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> deleteTutorialQuiz(int quizId)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<String>(HttpStatus.OK.value(),"????????? ?????????????????????.");
        TutorialQuiz tutorialQuiz = tutorialQuizRepository.findById(quizId).get();
        tutorialQuiz.getTutorial().setTutorialQuiz(null);
        tutorialQuizRepository.deleteById(quizId);

        return responseDTO;
    }
}
