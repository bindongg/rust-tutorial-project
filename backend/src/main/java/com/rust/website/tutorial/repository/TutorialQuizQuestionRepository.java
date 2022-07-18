package com.rust.website.tutorial.repository;

import com.rust.website.tutorial.model.entity.TutorialQuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TutorialQuizQuestionRepository extends JpaRepository<TutorialQuizQuestion, Integer> {
    public List<TutorialQuizQuestion> findByTutorialQuiz_idOrderByIdAsc(int tutorialQuiz_id);
    public void deleteByTutorialQuiz_id(int tutorialQuiz_id);
}
