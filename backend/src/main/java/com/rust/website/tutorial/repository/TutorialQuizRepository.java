package com.rust.website.tutorial.repository;

import com.rust.website.tutorial.model.entity.TutorialQuiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TutorialQuizRepository extends JpaRepository<TutorialQuiz, Integer> {
}
