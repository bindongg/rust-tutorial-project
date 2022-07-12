package com.rust.website.exercise.repository;

import com.rust.website.exercise.model.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {
    @Query(value = "select ex from Exercise ex order by ex.number asc")
    public List<Exercise> findAllOrderByNumberAsc();

    public Exercise findByNumber(int number);
}
