package com.rust.website.tutorial.repository;

import com.rust.website.tutorial.model.entity.Tutorial;
import com.rust.website.tutorial.model.entity.TutorialRelation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TutorialRelationRepository extends JpaRepository<TutorialRelation, Integer> {
    void deleteAllByTutorial(Tutorial tutorial);
}
