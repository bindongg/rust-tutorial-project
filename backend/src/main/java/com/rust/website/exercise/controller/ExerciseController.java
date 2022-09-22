package com.rust.website.exercise.controller;

import com.rust.website.common.config.jwt.JwtProperties;
import com.rust.website.common.config.jwt.JwtUtil;
import com.rust.website.common.dto.TupleResponseDTO;
import com.rust.website.compile.model.model.ExecutionConstraints;
import com.rust.website.compile.model.myEnum.Language;
import com.rust.website.exercise.model.entity.Exercise;
import com.rust.website.exercise.model.myEnum.ExerciseDifficulty;
import com.rust.website.exercise.model.myEnum.ExerciseTag;
import com.rust.website.exercise.service.ExerciseService;
import com.rust.website.compile.model.dto.CompileInputDTO;
import com.rust.website.common.dto.ResponseDTO;
import com.rust.website.compile.model.dto.CompileOutputDTO;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@AllArgsConstructor
public class ExerciseController {
    private final ExerciseService exerciseService;

    @GetMapping("/exercise")
    public TupleResponseDTO<List<Exercise>> getExercises(HttpServletRequest request, Pageable pageable)
    {
        String userId = JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING), JwtProperties.CLAIM_NAME);
        return new TupleResponseDTO<List<Exercise>>(HttpStatus.OK.value(), exerciseService.getTotal(), exerciseService.getExercises(userId, pageable));
    }

    @GetMapping("/exercise/{id}")
    public ResponseDTO<Exercise> getExerciseContent(@PathVariable int id, HttpServletRequest request)
    {
        String userId = JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING), JwtProperties.CLAIM_NAME);
        return new ResponseDTO<Exercise>(HttpStatus.OK.value(), exerciseService.getExercise(id, userId));
    }

    @PostMapping("/exercise/compile/{id}")
    public ResponseDTO<CompileOutputDTO> compileUserCode(@RequestBody CompileInputDTO compileInputDTO, @PathVariable int id, HttpServletRequest request)
    {
        String userId = JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING), JwtProperties.CLAIM_NAME);
        compileInputDTO.setLanguage(Language.RUST);
        ExecutionConstraints constraints = ExecutionConstraints.builder()
                .memoryLimit(200)
                .timeLimit(10000)
                .build();
        return exerciseService.compileUserCode(compileInputDTO, id, userId, constraints);
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

    @GetMapping("/exercise/tag")
    public TupleResponseDTO<List<Exercise>> getExercisesByTag(HttpServletRequest request, Pageable pageable, @RequestParam ExerciseTag tag)
    {
        String userId = JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING), JwtProperties.CLAIM_NAME);
        return new TupleResponseDTO<List<Exercise>>(HttpStatus.OK.value(), exerciseService.getTotal(tag), exerciseService.getExercises(userId, pageable, tag));
    }

    @GetMapping("/exercise/difficulty")
    public TupleResponseDTO<List<Exercise>> getExercisesByTag(HttpServletRequest request, Pageable pageable, @RequestParam ExerciseDifficulty difficulty)
    {
        String userId = JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING), JwtProperties.CLAIM_NAME);
        return new TupleResponseDTO<List<Exercise>>(HttpStatus.OK.value(), exerciseService.getTotal(difficulty), exerciseService.getExercises(userId, pageable, difficulty));
    }
}
