package com.rust.website.exercise.controller;

import com.rust.website.common.config.jwt.JwtProperties;
import com.rust.website.common.config.jwt.JwtUtil;
import com.rust.website.exercise.model.entity.Exercise;
import com.rust.website.exercise.service.ExerciseService;
import com.rust.website.tutorial.model.dto.CompileInputDTO;
import com.rust.website.common.dto.ResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@AllArgsConstructor
public class ExerciseController {
    private final ExerciseService exerciseService;

    @GetMapping("/exercise")
    public ResponseDTO<List<Exercise>> getExercises(HttpServletRequest request)
    {
        String userId = JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING), JwtProperties.CLAIM_NAME);
        return new ResponseDTO<List<Exercise>>(HttpStatus.OK.value(), exerciseService.getExercises(userId));
    }

    @GetMapping("/exercise/{id}")
    public ResponseDTO<Exercise> getExerciseContent(@PathVariable int id)
    {
        return new ResponseDTO<Exercise>(HttpStatus.OK.value(), exerciseService.getExercise(id));
    }

    @PostMapping("/exercise/compile/{id}")
    public ResponseDTO<String> compileUserCode(@RequestBody CompileInputDTO compileInputDTO, @PathVariable int id, HttpServletRequest request)
    {
        String userId = JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING), JwtProperties.CLAIM_NAME);
        return exerciseService.compileUserCode(compileInputDTO, id, userId);
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
