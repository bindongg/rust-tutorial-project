package com.rust.website.exercise.repository;

import com.rust.website.exercise.model.entity.Exercise;
import com.rust.website.exercise.model.entity.ExerciseTry;
import com.rust.website.exercise.model.myEnum.ExerciseSolved;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

public interface ExerciseTryRepository extends JpaRepository<ExerciseTry, Integer> {
    List<ExerciseTry> findByUser_id(String user_id);
    default Map<Integer, ExerciseTry> findByUser_idToMap(String user_id) {
        return findByUser_id(user_id).stream().collect(Collectors.toMap(ExerciseTry::getExercise_id, v -> v));
    }

    Optional<ExerciseTry> findByUser_idAndExercise_id(String user_id, int exercise_id);
    void deleteByExercise_id(int exercise_id);
    List<ExerciseTry> findByUser_idAndSolved(Pageable pageable, String user_id, ExerciseSolved exerciseSolved);
    List<ExerciseTry> findByUser_idAndSolved(String user_id, ExerciseSolved exerciseSolved);

    Collection<ExerciseTry> findByUser_idAndSolvedAndExerciseIn(String user_id, ExerciseSolved solved, List<Exercise> exerciseList);
}
