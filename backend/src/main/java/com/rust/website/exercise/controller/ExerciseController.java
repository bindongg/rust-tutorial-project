package com.rust.website.exercise.controller;

import com.rust.website.exercise.model.entity.Exercise;
import com.rust.website.exercise.service.ExerciseService;
import com.rust.website.tutorial.model.model.CompileInput;
import com.rust.website.common.dto.ResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class ExerciseController {
    private final ExerciseService exerciseService;

    @GetMapping("/exercise")
    public ResponseDTO<List<Exercise>> getExercises(@RequestParam String user_id)
    {
            return new ResponseDTO<List<Exercise>>(HttpStatus.OK.value(), exerciseService.getExercises(user_id));
    }

    @GetMapping("/exercise/{id}")
    public ResponseDTO<Exercise> getExerciseContent(@PathVariable int id)
    {
        return new ResponseDTO<Exercise>(HttpStatus.OK.value(), exerciseService.getExercise(id));
    }

    @PostMapping("/exercise/compile/{id}/{user_id}")
    public ResponseDTO<String> compileUserCode(@RequestBody CompileInput compileInput, @PathVariable int id, @PathVariable String user_id)
    {
        return exerciseService.compileUserCode(compileInput, id, user_id);
    }

    @PostMapping("/exercise")
    public ResponseDTO<String> addExercise(@RequestBody Exercise exercise)
    {
        return exerciseService.addExercise(exercise);
    }

    @PatchMapping("/exercise/{id}")
    public ResponseDTO<String> updateExercise(@RequestBody Exercise exercise, @PathVariable int id)
    {
        return exerciseService.updateExercise(exercise, id);
    }

    @DeleteMapping("/exercise/{id}")
    public ResponseDTO<String> deleteExercise(@PathVariable int id)
    {
        return exerciseService.deleteExercise(id);
    }
}
