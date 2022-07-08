package com.rust.website.tutorial.repository;

import com.rust.website.tutorial.model.entity.TutorialSub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;
import java.util.Optional;

public interface TutorialSubRepository extends JpaRepository<TutorialSub, Integer> {
    public TutorialSub findByTutorial_idAndNumber(int tutorial_id, int number);

    public void deleteByTutorial_idAndNumber(int tutorial_id, int number);
}
