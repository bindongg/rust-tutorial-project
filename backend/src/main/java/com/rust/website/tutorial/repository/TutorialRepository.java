package com.rust.website.tutorial.repository;

import com.rust.website.tutorial.model.entity.Tutorial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TutorialRepository extends JpaRepository<Tutorial, Integer> {
    @Query(value = "select * from tutorial order by number asc limit ?1", nativeQuery = true)
    public List<Tutorial> getTutorials(int tutorialNum);

    public Tutorial findByNumber(int number);

    public void deleteByNumber(int number);
}
