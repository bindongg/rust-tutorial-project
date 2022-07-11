package com.rust.website.exercise.repository;

import com.rust.website.exercise.model.entity.ExerciseContent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseContentRepository extends JpaRepository<ExerciseContent, Integer> {
}
