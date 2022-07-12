package com.rust.website.exercise.service;

import com.rust.website.exercise.repository.ExerciseRepository;
import com.rust.website.exercise.repository.ExerciseTryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootTest(classes = {ExerciseService.class, ExerciseRepository.class, ExerciseTryRepository.class})
@EnableJpaRepositories(basePackages = "com.rust.website.exercise.repository")
public class ExerciseServiceTest {
    @Autowired
    ExerciseService exerciseService;

    @Autowired
    ExerciseRepository exerciseRepository;

    @Autowired
    ExerciseTryRepository exerciseTryRepository;


    @Test
    void mapTest() {
//        exerciseService.getExercises("hdm");
    }
}
