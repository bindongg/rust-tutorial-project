package com.rust.website.exercise.repository;

import com.rust.website.exercise.model.entity.Exercise;
import com.rust.website.exercise.model.entity.ExerciseTry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public interface ExerciseTryRepository extends JpaRepository<ExerciseTry, Integer> {
    public List<ExerciseTry> findByUser_id(String user_id);
    default Map<Integer, ExerciseTry> findByUser_idToMap(String user_id) {
        return findByUser_id(user_id).stream().collect(Collectors.toMap(ExerciseTry::getExercise_id, v -> v));
    }

    public ExerciseTry findByUser_idAndExercise_id(String user_id, int exercise_id);
    public void deleteByExercise_id(int exercise_id);
}
