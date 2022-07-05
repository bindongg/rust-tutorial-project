package com.rust.website.tutorial.service;

import com.rust.website.tutorial.model.entity.*;
import com.rust.website.tutorial.model.vo.QuizResponseVo;
import com.rust.website.tutorial.model.vo.ResponseVo;
import com.rust.website.tutorial.repository.TutorialDoneRepository;
import com.rust.website.tutorial.repository.TutorialQuizAnswerRepository;
import com.rust.website.tutorial.repository.TutorialRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class TutorialService {
    private final TutorialRepository tutorialRepository;
    private final TutorialDoneRepository tutorialDoneRepository;
    private final TutorialQuizAnswerRepository tutorialQuizAnswerRepository;

    @Transactional(readOnly = true)
    public List<Tutorial> getTutorials(String userId)
    {
        int doneCnt = tutorialDoneRepository.countByUser_id(userId);
        List<Tutorial> tutorials = tutorialRepository.getTutorials(doneCnt+1);
        return tutorials;
    }

    @Transactional(readOnly = true)
    public TutorialSub getTutorialSub(int id, int subId)
    {
        return tutorialRepository.findById(id).getTutorialSubs().get(subId-1);
    }

    @Transactional(readOnly = true)
    public TutorialQuiz getTutorialQuiz(int id)
    {
        return tutorialRepository.findById(id).getTutorialQuiz();
    }

    @Transactional
    public QuizResponseVo postTutorialQuizAnswer(List<Integer> userAnswers, int id, String userId)
    {
        List<TutorialQuizAnswer> answers = tutorialQuizAnswerRepository.findByTutorial_idOrderByIdAsc(id);
        List<Boolean> correctList = new ArrayList<Boolean>();
        Boolean isCorrect = true;
        for (int i = 0; i < answers.size(); ++i) {
            if (userAnswers.get(i).equals(answers.get(i).getAnswer()))
            {
                correctList.add(true);
                isCorrect = isCorrect && true;
            }
            else
            {
                correctList.add(false);
                isCorrect = isCorrect && false;
            }
        }

        String message = null;
        if (isCorrect)
        {
            TutorialDone newDone = tutorialDoneRepository.findByUser_idAndTutorialId(userId, id);
            if (newDone == null) { tutorialDoneRepository.insert(userId, id); }
            message = "맞았습니다!";
        }
        else { message = "틀렸습니다"; }

        return new QuizResponseVo(isCorrect, message, correctList);
    }

    @Transactional
    public ResponseVo<String> addTutorial(Tutorial newTutorial)
    {
        ResponseVo<String> responseVo = new ResponseVo<String>(HttpStatus.OK.value(),null);
        Tutorial tutorial = tutorialRepository.findById(newTutorial.getId());
        if (tutorial == null)
        {
            tutorialRepository.save(newTutorial);
            responseVo.setData("추가가 완료되었습니다.");
        }
        else { responseVo.setData("대주제가 이미 존재합니다."); }
        return responseVo;
    }
}
