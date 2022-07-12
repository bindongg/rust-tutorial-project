package com.rust.website.exercise.service;

import com.rust.website.exercise.model.entity.Exercise;
import com.rust.website.exercise.model.entity.ExerciseContent;
import com.rust.website.exercise.model.entity.ExerciseTestcase;
import com.rust.website.exercise.model.entity.ExerciseTry;
import com.rust.website.exercise.model.myEnum.ExerciseSolved;
import com.rust.website.exercise.repository.ExerciseContentRepository;
import com.rust.website.exercise.repository.ExerciseRepository;
import com.rust.website.exercise.repository.ExerciseTestcaseRepository;
import com.rust.website.exercise.repository.ExerciseTryRepository;
import com.rust.website.tutorial.model.model.CompileInput;
import com.rust.website.tutorial.model.model.CompileOutput;
import com.rust.website.tutorial.model.vo.ResponseVo;
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
import java.util.stream.Collectors;
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
                    if (exerciseTries.get(e.getId()) != null)
                    {
                        e.setSolved(exerciseTries.get(e.getId()).getSolved());
                    }
                    e.setExerciseContent(null);
                    e.setExerciseTestcases(null);
                    returnList.add(e);
                });
        return returnList;
    }

    @Transactional(readOnly = true)
    public Exercise getExercise(int number)
    {
        return exerciseRepository.findByNumber(number);
    }

    @Transactional
    public ResponseVo<String> compileUserCode(CompileInput compileInput, int number, String id)
    {
        ResponseVo<String> responseVo = new ResponseVo<String>(HttpStatus.OK.value(), "맞았습니다!");
        Exercise exercise = exerciseRepository.findByNumber(number);
        List<ExerciseTestcase> exerciseTestcases = exercise.getExerciseTestcases();
        int i = 0;
        for (; i < exerciseTestcases.size(); ++i)
        {
            compileInput.setStdIn(exerciseTestcases.get(i).getInput());
            CompileOutput compileOutput = null;
            try {
                compileOutput = compileService.onlineCompile(compileInput);
            } catch (IOException e) {
                e.printStackTrace();
                break;
            }
            if (!exerciseTestcases.get(i).getOutput().equals(compileOutput.getStdOut())) { break; }
        }

        ExerciseTry exerciseTry =  exerciseTryRepository.findByUser_idAndExercise_id(id, exercise.getId());
        if (exerciseTry == null) {
            exerciseTry = ExerciseTry.builder()
                    .exercise(exercise)
                    .user(userRepository.findById(id).get())
                    .build();
        }
        exerciseTry.setSourceCode(compileInput.getCode());

        if (exerciseTestcases.size() == i)
        {
            exerciseTry.setSolved(ExerciseSolved.SOLVE);
        }
        else
        {
            exerciseTry.setSolved(ExerciseSolved.FAIL);
            responseVo.setData("틀렸습니다.");
        }

        exerciseTryRepository.save(exerciseTry);
        return responseVo;
    }

    @Transactional
    public ResponseVo<String> addExercise(Exercise exercise)
    {
        ResponseVo<String> responseVo = new ResponseVo<>(HttpStatus.OK.value(), "추가가 완료되었습니다.");
        exercise.getExerciseContent().setExercise(exercise);
        List<ExerciseTestcase> exerciseTestcases = exercise.getExerciseTestcases();
        IntStream.range(0, exerciseTestcases.size())
                        .forEach(i -> exerciseTestcases.get(i).setExercise(exercise));
        exerciseRepository.save(exercise);
        return responseVo;
    }

    @Transactional
    public ResponseVo<String> updateExercise(Exercise newExercise, int number)
    {
        ResponseVo<String> responseVo = new ResponseVo<>(HttpStatus.OK.value(), "수정이 완료되었습니다.");
        Exercise exercise = exerciseRepository.findByNumber(number);
        exercise.copy(newExercise);
        exercise.getExerciseContent().copy(newExercise.getExerciseContent());

        exerciseTestcaseRepository.deleteByExercise_id(exercise.getId());
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

        return responseVo;
    }

    @Transactional
    public ResponseVo<String> deleteExercise(int number)
    {
        ResponseVo<String> responseVo = new ResponseVo<>(HttpStatus.OK.value(), "삭제가 완료되었습니다.");
        int id = exerciseRepository.findByNumber(number).getId();
        exerciseTryRepository.deleteByExercise_id(id);
        exerciseRepository.deleteById(id);

        return responseVo;
    }

}
