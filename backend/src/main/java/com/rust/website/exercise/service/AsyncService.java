package com.rust.website.exercise.service;

import com.rust.website.common.dto.ResponseDTO;
import com.rust.website.compile.model.dto.CompileInputDTO;
import com.rust.website.compile.model.dto.CompileOutputDTO;
import com.rust.website.compile.model.model.ExecutionConstraints;
import com.rust.website.compile.service.CompileService;
import com.rust.website.exercise.model.entity.Exercise;
import com.rust.website.exercise.model.entity.ExerciseTestcase;
import com.rust.website.exercise.model.entity.ExerciseTry;
import com.rust.website.exercise.model.myEnum.ExerciseSolved;
import com.rust.website.exercise.repository.ExerciseContentRepository;
import com.rust.website.exercise.repository.ExerciseRepository;
import com.rust.website.exercise.repository.ExerciseTestcaseRepository;
import com.rust.website.exercise.repository.ExerciseTryRepository;
import com.rust.website.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@AllArgsConstructor
public class AsyncService {
    private final CompileService compileService;
    private final ExerciseRepository exerciseRepository;
    private final ExerciseContentRepository exerciseContentRepository;
    private final ExerciseTryRepository exerciseTryRepository;
    private final ExerciseTestcaseRepository exerciseTestcaseRepository;
    private final UserRepository userRepository;

    @Async("executor")
    @Transactional
    public void compileUserCodeAsync(CompileInputDTO compileInputDTO, int id, String userId, ExecutionConstraints constraints)
    {
        Exercise exercise = exerciseRepository.findById(id).get();
        List<ExerciseTestcase> exerciseTestcases = exercise.getExerciseTestcases();

        HashMap<String, String> result = compileService.exerciseCompile(compileInputDTO, constraints, exerciseTestcases);

        ExerciseTry exerciseTry =  exerciseTryRepository.findByUser_idAndExercise_id(userId, id).orElse(null);
        if (exerciseTry == null) {
            exerciseTry = ExerciseTry.builder()
                    .exercise(exercise)
                    .user(userRepository.findById(userId).get())
                    .build();
        }
        exerciseTry.setSourceCode(compileInputDTO.getCode());

        if (result.get("success").equals("false"))
        {
            exerciseTry.setSolved(ExerciseSolved.FAIL);
        }
        else {
            if (exerciseTestcases.size() == Integer.valueOf(result.get("index")))
            {
                exerciseTry.setSolved(ExerciseSolved.SOLVE);
                exerciseTry.setTime(Integer.valueOf(result.get("time")));
            }
            else
            {
                exerciseTry.setSolved(ExerciseSolved.FAIL);
            }
        }
        exerciseTryRepository.save(exerciseTry);

        return;
    }
}
