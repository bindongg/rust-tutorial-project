package com.rust.website.exercise.repository;

import com.rust.website.exercise.model.entity.Exercise;
import com.rust.website.exercise.model.myEnum.ExerciseDifficulty;
import com.rust.website.exercise.model.myEnum.ExerciseTag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {
    public Page<Exercise> findAllByOrderByIdAsc(Pageable pageable);
    public Page<Exercise> findByTagOrderByIdAsc(ExerciseTag tag, Pageable pageable);
    public Page<Exercise> findByDifficultyOrderByIdAsc(ExerciseDifficulty difficulty, Pageable pageable);
    public long countByTag(ExerciseTag tag);
    public long countByDifficulty(ExerciseDifficulty difficulty);
}
