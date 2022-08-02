package com.rust.website.exercise.service;

import com.rust.website.exercise.model.entity.Exercise;
import com.rust.website.exercise.model.entity.ExerciseTestcase;
import com.rust.website.exercise.model.entity.ExerciseTry;
import com.rust.website.exercise.model.myEnum.ExerciseSolved;
import com.rust.website.exercise.repository.ExerciseContentRepository;
import com.rust.website.exercise.repository.ExerciseRepository;
import com.rust.website.exercise.repository.ExerciseTestcaseRepository;
import com.rust.website.exercise.repository.ExerciseTryRepository;
import com.rust.website.tutorial.model.dto.CompileInputDTO;
import com.rust.website.tutorial.model.dto.CompileOutputDTO;
import com.rust.website.common.dto.ResponseDTO;
import com.rust.website.tutorial.service.CompileService;
import com.rust.website.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.IntStream;

@Service
@AllArgsConstructor
public class ExerciseService {
    private final CompileService compileService;

    private final ExerciseRepository exerciseRepository;
    private final ExerciseContentRepository exerciseContentRepository;
    private final ExerciseTryRepository exerciseTryRepository;
    private final ExerciseTestcaseRepository exerciseTestcaseRepository;
    private final UserRepository userRepository;


    @Transactional(readOnly = true)
    public List<Exercise> getExercises(String user_id)
    {
        Map<Integer, ExerciseTry> exerciseTries = exerciseTryRepository.findByUser_idToMap(user_id);
        List<Exercise> exercises = exerciseRepository.findAllOrderByNumberAsc();
        List<Exercise> returnList = new ArrayList<>();
        exercises.stream()
                .forEach(e -> {
                    if (exerciseTries.get(e.getId()) != null) { e.setSolved(exerciseTries.get(e.getId()).getSolved()); }
                    else { e.setSolved(ExerciseSolved.NO_TRY);}
                    e.setExerciseContent(null);
                    e.setExerciseTestcases(null);
                    returnList.add(e);
                });
        return returnList;
    }

    @Transactional(readOnly = true)
    public Exercise getExercise(int id)
    {
        return exerciseRepository.findById(id).get();
    }

    @Transactional
    public ResponseDTO<String> compileUserCode(CompileInputDTO compileInputDTO, int id, String userId)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<String>(HttpStatus.OK.value(), "맞았습니다!");
        Exercise exercise = exerciseRepository.findById(id).get();
        List<ExerciseTestcase> exerciseTestcases = exercise.getExerciseTestcases();
        int i = 0;
        for (; i < exerciseTestcases.size(); ++i)
        {
            compileInputDTO.setStdIn(exerciseTestcases.get(i).getInput());
            CompileOutputDTO compileOutputDTO = null;
            try {
                compileOutputDTO = compileService.onlineCompile(compileInputDTO);
            } catch (IOException e) {
                e.printStackTrace();
                break;
            }
            if (!exerciseTestcases.get(i).getOutput().equals(compileOutputDTO.getStdOut())) { break; }
        }

        ExerciseTry exerciseTry =  exerciseTryRepository.findByUser_idAndExercise_id(userId, id).get();
        if (exerciseTry == null) {
            exerciseTry = ExerciseTry.builder()
                    .exercise(exercise)
                    .user(userRepository.findById(userId).get())
                    .build();
        }
        exerciseTry.setSourceCode(compileInputDTO.getCode());

        if (exerciseTestcases.size() == i)
        {
            exerciseTry.setSolved(ExerciseSolved.SOLVE);
        }
        else
        {
            exerciseTry.setSolved(ExerciseSolved.FAIL);
            responseDTO.setData("틀렸습니다.");
        }

        exerciseTryRepository.save(exerciseTry);
        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> addExercise(Exercise exercise)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<>(HttpStatus.OK.value(), "추가가 완료되었습니다.");
        exercise.getExerciseContent().setExercise(exercise);
        List<ExerciseTestcase> exerciseTestcases = exercise.getExerciseTestcases();
        IntStream.range(0, exerciseTestcases.size())
                        .forEach(i -> exerciseTestcases.get(i).setExercise(exercise));
        exerciseRepository.save(exercise);
        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> updateExercise(Exercise newExercise, int id)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<>(HttpStatus.OK.value(), "수정이 완료되었습니다.");
        Exercise exercise = exerciseRepository.findById(id).get();
        exercise.copy(newExercise);
        exercise.getExerciseContent().copy(newExercise.getExerciseContent());

        exerciseTestcaseRepository.deleteByExercise_id(id);
        exerciseTestcaseRepository.flush();
        List<ExerciseTestcase> exerciseTestcases = newExercise.getExerciseTestcases();
        IntStream.range(0, exerciseTestcases.size())
                .mapToObj(i -> ExerciseTestcase.builder()
                        .exercise(exercise)
                        .number(exerciseTestcases.get(i).getNumber())
                        .input(exerciseTestcases.get(i).getInput())
                        .output(exerciseTestcases.get(i).getOutput())
                        .build()
                )
                .forEach(tc -> exerciseTestcaseRepository.save(tc));

        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> deleteExercise(int id)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<>(HttpStatus.OK.value(), "삭제가 완료되었습니다.");
        exerciseTryRepository.deleteByExercise_id(id);
        exerciseRepository.deleteById(id);

        return responseDTO;
    }

}
