package com.rust.website.exercise.controller;

import com.rust.website.exercise.model.entity.Exercise;
import com.rust.website.exercise.model.entity.ExerciseContent;
import com.rust.website.exercise.service.ExerciseService;
import com.rust.website.tutorial.model.model.CompileInput;
import com.rust.website.tutorial.model.vo.ResponseVo;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;
import java.util.List;

@RestController
@AllArgsConstructor
public class ExerciseController {
    private final ExerciseService exerciseService;

    @GetMapping("/exercise")
    public ResponseVo<List<Exercise>> getExercises(@RequestParam String user_id)
    {
            return new ResponseVo<List<Exercise>>(HttpStatus.OK.value(), exerciseService.getExercises(user_id));
    }

    @GetMapping("/exercise/{number}")
    public ResponseVo<Exercise> getExerciseContent(@PathVariable int number)
    {
        return new ResponseVo<Exercise>(HttpStatus.OK.value(), exerciseService.getExercise(number));
    }

    @PostMapping("/exercise/compile/{number}/{user_id}")
    public ResponseVo<String> compileUserCode(@RequestBody CompileInput compileInput, @PathVariable int number, @PathVariable String user_id)
    {
        return exerciseService.compileUserCode(compileInput, number, user_id);
    }

    @PostMapping("/exercise/add")
    public ResponseVo<String> addExercise(@RequestBody Exercise exercise)
    {
        return exerciseService.addExercise(exercise);
    }

    @PatchMapping("/exercise/update/{number}")
    public ResponseVo<String> updateExercise(@RequestBody Exercise exercise, @PathVariable int number)
    {
        return exerciseService.updateExercise(exercise, number);
    }

    @DeleteMapping("/exercise/delete/{number}")
    public ResponseVo<String> deleteExercise(@PathVariable int number)
    {
        return exerciseService.deleteExercise(number);
    }
}
