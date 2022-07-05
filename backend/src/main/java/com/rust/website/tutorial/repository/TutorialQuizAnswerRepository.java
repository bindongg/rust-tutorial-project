package com.rust.website.tutorial.repository;

import com.rust.website.tutorial.model.entity.TutorialQuizAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TutorialQuizAnswerRepository extends JpaRepository<TutorialQuizAnswer, TutorialQuizAnswerKey> {
    public List<TutorialQuizAnswer> findByTutorial_idOrderByIdAsc(int tutorial_id);
}
