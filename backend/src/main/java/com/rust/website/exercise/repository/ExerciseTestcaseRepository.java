package com.rust.website.exercise.repository;

import com.rust.website.exercise.model.entity.ExerciseTestcase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExerciseTestcaseRepository extends JpaRepository<ExerciseTestcase, Integer> {
    public void deleteByExercise_id(int exercise_id);
    public List<ExerciseTestcase> findByExercise_idOrderByNumberAsc(int exercise_id);
}
