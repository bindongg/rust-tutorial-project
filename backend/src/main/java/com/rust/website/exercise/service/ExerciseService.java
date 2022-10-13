package com.rust.website.exercise.service;

import com.rust.website.compile.model.model.ExecutionConstraints;
import com.rust.website.compile.model.myEnum.Language;
import com.rust.website.exercise.model.entity.Exercise;
import com.rust.website.exercise.model.entity.ExerciseTestcase;
import com.rust.website.exercise.model.entity.ExerciseTry;
import com.rust.website.exercise.model.myEnum.ExerciseDifficulty;
import com.rust.website.exercise.model.myEnum.ExerciseSolved;
import com.rust.website.exercise.model.myEnum.ExerciseTag;
import com.rust.website.exercise.repository.ExerciseContentRepository;
import com.rust.website.exercise.repository.ExerciseRepository;
import com.rust.website.exercise.repository.ExerciseTestcaseRepository;
import com.rust.website.exercise.repository.ExerciseTryRepository;
import com.rust.website.compile.model.dto.CompileInputDTO;
import com.rust.website.compile.model.dto.CompileOutputDTO;
import com.rust.website.common.dto.ResponseDTO;
import com.rust.website.compile.service.CompileService;
import com.rust.website.user.model.exception.NoSuchEntityException;
import com.rust.website.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.*;
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
    private final AsyncService asyncService;

    @Transactional(readOnly = true)
    public List<Exercise> getExercises(String user_id, Pageable pageable)
    {
        Map<Integer, ExerciseTry> exerciseTries = exerciseTryRepository.findByUser_idToMap(user_id);
        List<Exercise> exercises = exerciseRepository.findAllByOrderByIdAsc(pageable).getContent();
        return computeReturnList(exercises, exerciseTries);
    }
    @Transactional(readOnly = true)
    public List<Exercise> getExercises(String user_id, Pageable pageable, ExerciseTag tag)
    {
        Map<Integer, ExerciseTry> exerciseTries = exerciseTryRepository.findByUser_idToMap(user_id);
        List<Exercise> exercises = exerciseRepository.findByTagOrderByIdAsc(tag, pageable).getContent();
        return computeReturnList(exercises, exerciseTries);
    }
    @Transactional(readOnly = true)
    public List<Exercise> getExercises(String user_id, Pageable pageable, ExerciseDifficulty difficulty)
    {
        Map<Integer, ExerciseTry> exerciseTries = exerciseTryRepository.findByUser_idToMap(user_id);
        List<Exercise> exercises = exerciseRepository.findByDifficultyOrderByIdAsc(difficulty, pageable).getContent();
        return computeReturnList(exercises, exerciseTries);
    }

    @Transactional(readOnly = true)
    public List<Exercise> computeReturnList(List<Exercise> exercises, Map<Integer, ExerciseTry> exerciseTries)
    {
        List<Exercise> returnList = new ArrayList<>();
        exercises.stream()
                .forEach(e -> {
                    if (exerciseTries.get(e.getId()) != null) {
                        e.setSolved(exerciseTries.get(e.getId()).getSolved());
                        e.setTryTime(exerciseTries.get(e.getId()).getTime());
                        e.setUserCode(exerciseTries.get(e.getId()).getSourceCode());
                    }
                    else { e.setSolved(ExerciseSolved.NO_TRY);}
                    e.setTime(e.getExerciseContent().getTime());
                    e.setExerciseContent(null);
                    e.setExerciseTestcases(null);
                    returnList.add(e);
                });
        return returnList;
    }

    @Transactional(readOnly = true)
    public long getTotal()
    {
        return exerciseRepository.count();
    }
    @Transactional(readOnly = true)
    public long getTotal(ExerciseTag tag)
    {
        return exerciseRepository.countByTag(tag);
    }
    @Transactional(readOnly = true)
    public long getTotal(ExerciseDifficulty difficulty)
    {
        return exerciseRepository.countByDifficulty(difficulty);
    }

    @Transactional(readOnly = true)
    public Exercise getExercise(int id, String userId)
    {
        Exercise exercise = exerciseRepository.findById(id).get();
        Optional<ExerciseTry> exerciseTry = exerciseTryRepository.findByUser_idAndExercise_id(userId, id);
        if (exerciseTry.isPresent())
        {
            exercise.setSolved(exerciseTry.get().getSolved() == null ? ExerciseSolved.NO_TRY : exerciseTry.get().getSolved());
        }
        return exercise;
    }

    @Transactional
    public ResponseDTO<CompileOutputDTO> compileUserCode(CompileInputDTO compileInputDTO, int id, String userId, ExecutionConstraints constraints)
    {
        CompileOutputDTO compileOutputDTO = new CompileOutputDTO();
        Exercise exercise = exerciseRepository.findById(id).get();
        List<ExerciseTestcase> exerciseTestcases = exerciseTestcaseRepository.findByExercise_idOrderByNumberAsc(id);

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
            compileOutputDTO.setStdOut("컴파일실패.");
        }
        else {
            if (exerciseTestcases.size() == Integer.valueOf(result.get("index")))
            {
                exerciseTry.setSolved(ExerciseSolved.SOLVE);
                exerciseTry.setTime(Integer.valueOf(result.get("time")));
                compileOutputDTO.setStdOut("맞았습니다.");
                compileOutputDTO.setTime(Integer.valueOf(result.get("time")));
            }
            else
            {
                exerciseTry.setSolved(ExerciseSolved.FAIL);
                compileOutputDTO.setStdOut("틀렸습니다.");
            }
        }
        exerciseTryRepository.save(exerciseTry);

        ResponseDTO<CompileOutputDTO> responseDTO = new ResponseDTO<CompileOutputDTO>(HttpStatus.OK.value(), compileOutputDTO);
        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> addExercise(Exercise exercise)
    {
        exercise.getExerciseContent().setExercise(exercise);
        List<ExerciseTestcase> exerciseTestcases = exercise.getExerciseTestcases();
        IntStream.range(0, exerciseTestcases.size())
                        .forEach(i -> exerciseTestcases.get(i).setExercise(exercise));
        exerciseRepository.save(exercise);
        return new ResponseDTO<>(HttpStatus.OK.value(), "추가가 완료되었습니다.");
    }

    @Transactional
    public ResponseDTO<String> updateExercise(Exercise newExercise, int id, ExecutionConstraints constraints)
    {
        Exercise exercise = exerciseRepository.findById(id).orElseThrow(()->{throw new IllegalArgumentException();});
        exercise.copy(newExercise);
        exercise.getExerciseContent().copy(newExercise.getExerciseContent());
        List<ExerciseTestcase> newExerciseTestcases = newExercise.getExerciseTestcases();

        exerciseTestcaseRepository.deleteByExercise_id(id);
        exerciseTestcaseRepository.flush();

        IntStream.range(0, newExerciseTestcases.size())
                .mapToObj(i -> ExerciseTestcase.builder()
                        .exercise(exercise)
                        .input(newExerciseTestcases.get(i).getInput())
                        .output(newExerciseTestcases.get(i).getOutput())
                        .build()
                )
                .forEach(tc -> exerciseTestcaseRepository.save(tc));

        List<ExerciseTry> exerciseTries = exerciseTryRepository.findByExercise_id(id);
        exerciseTries.stream()
                .forEach(tries -> asyncService.compileUserCodeAsync(
                        CompileInputDTO.builder()
                                .code(tries.getSourceCode())
                                .language(Language.RUST)
                                .build()
                        , id, tries.getUser().getId(), constraints)
                );

        return new ResponseDTO<>(HttpStatus.OK.value(), "수정이 완료되었습니다.");
    }

    @Transactional
    public ResponseDTO<String> deleteExercise(int id)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<>(HttpStatus.OK.value(), "삭제가 완료되었습니다.");
        exerciseTryRepository.deleteByExercise_id(id);
        exerciseRepository.deleteById(id);

        return responseDTO;
    }

    @Transactional(readOnly = true)
    public Collection<Exercise> getExerciseByTag(List<ExerciseTag> relationList)
    {
        return exerciseRepository.findExercisesByTagInAndDifficultyIsLessThanEqual(relationList, ExerciseDifficulty.STAR3);
    }

    @Transactional(readOnly = true)
    public Collection<ExerciseTry> getExerciseTryByUsernameAndExerciseId(String userId, ExerciseSolved solved, List<Exercise> exerciseList)
    {
        return exerciseTryRepository.findByUser_idAndSolvedAndExerciseIn(userId,solved,exerciseList);
    }

    @Transactional(readOnly = true)
    public String getExerciseTryCode(int id, String username)
    {
        ExerciseTry exerciseTry = exerciseTryRepository.findByUser_idAndExercise_id(username,id).orElseThrow(()->new NoSuchEntityException("No such entity"));
        return exerciseTry.getSourceCode();
    }

    @Transactional
    public void initExerciseTryCode(int id, String username)
    {
        Exercise exercise = exerciseRepository.findById(id).orElseThrow(()->new NoSuchEntityException("No such entity"));;
        ExerciseTry exerciseTry = exerciseTryRepository.findByUser_idAndExercise_id(username, id).orElseThrow(()->new NoSuchEntityException("No such entity"));
        exerciseTry.setSourceCode(exercise.getExerciseContent().getCode());
    }
}
