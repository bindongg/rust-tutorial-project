package com.rust.website.tutorial.repository;

import com.rust.website.tutorial.model.entity.Tutorial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TutorialRepository extends JpaRepository<Tutorial, Integer> {
    @Query(value = "select * from Tutorial order by number asc limit ?1", nativeQuery = true)
    public List<Tutorial> getTutorials(int tutorialNum);
    @Query(value = "select * from Tutorial order by number", nativeQuery = true)
    public List<Tutorial> getAllTutorials();
    public Optional<Tutorial> findByNumber(int number);
}
