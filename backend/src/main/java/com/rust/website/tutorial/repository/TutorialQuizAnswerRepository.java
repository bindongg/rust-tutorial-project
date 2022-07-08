package com.rust.website.tutorial.repository;

import com.rust.website.tutorial.model.entity.TutorialQuizAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TutorialQuizAnswerRepository extends JpaRepository<TutorialQuizAnswer, Integer> {
    public List<TutorialQuizAnswer> findByTutorialQuiz_idOrderByIdAsc(int tutorialQuiz_id);
    public void deleteByTutorialQuiz_id(int tutorialQuiz_id);
}
