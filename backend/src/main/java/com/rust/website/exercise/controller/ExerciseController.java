package com.rust.website.exercise.controller;

import com.rust.website.common.config.jwt.JwtProperties;
import com.rust.website.common.config.jwt.JwtUtil;
import com.rust.website.common.dto.TupleResponseDTO;
import com.rust.website.compile.model.model.ExecutionConstraints;
import com.rust.website.compile.model.myEnum.Language;
import com.rust.website.compile.service.CompileService;
import com.rust.website.exercise.model.entity.Exercise;
import com.rust.website.exercise.model.entity.ExerciseTry;
import com.rust.website.exercise.model.myEnum.ExerciseDifficulty;
import com.rust.website.exercise.model.myEnum.ExerciseSolved;
import com.rust.website.exercise.model.myEnum.ExerciseTag;
import com.rust.website.exercise.service.ExerciseService;
import com.rust.website.compile.model.dto.CompileInputDTO;
import com.rust.website.common.dto.ResponseDTO;
import com.rust.website.compile.model.dto.CompileOutputDTO;
import com.rust.website.user.model.exception.NoSuchEntityException;
import com.sun.xml.bind.v2.model.core.EnumConstant;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@RestController
@AllArgsConstructor
public class ExerciseController {
    private final ExerciseService exerciseService;

    private final CompileService compileService;

    @GetMapping("/exercise")
    public TupleResponseDTO<List<Exercise>> getExercises(HttpServletRequest request, Pageable pageable)
    {
        String userId = JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING), JwtProperties.CLAIM_NAME);
        return new TupleResponseDTO<>(HttpStatus.OK.value(), exerciseService.getTotal(), exerciseService.getExercises(userId, pageable));
    }

    @GetMapping("/exercise/{id}")
    public ResponseDTO<Exercise> getExerciseContent(@PathVariable int id, HttpServletRequest request)
    {
        String userId = JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING), JwtProperties.CLAIM_NAME);
        return new ResponseDTO<>(HttpStatus.OK.value(), exerciseService.getExercise(id, userId));
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
        if(exercise.getExerciseTestcases().size() == 0)
        {
            throw new IllegalArgumentException("0 testcases");
        }
        if(exercise.getExerciseContent().getTestCode() == null || exercise.getExerciseContent().getTestCode().equals(""))
        {
            return exerciseService.addExercise(exercise);
        }

        CompileInputDTO compileInputDTO = CompileInputDTO.builder()
                .code(exercise.getExerciseContent().getTestCode())
                .language(Language.RUST)
                .build();
        ExecutionConstraints constraints = ExecutionConstraints.builder()
                .memoryLimit(200)
                .timeLimit(10000)
                .build();

        HashMap<String, String> result = compileService.exerciseCompile(compileInputDTO, constraints, exercise.getExerciseTestcases());
        int idx = Integer.valueOf(result.get("index"));
        long runTime = Integer.valueOf(result.get("time"));

        if(idx != exercise.getExerciseTestcases().size())
        {
            throw new IllegalArgumentException("wrong test code");
        }
        exercise.getExerciseContent().setTime(runTime);
        return exerciseService.addExercise(exercise);
    }

    @PatchMapping("/exercise/{id}")
    public ResponseDTO<String> updateExercise(@RequestBody Exercise exercise, @PathVariable int id)
    {
        if(exercise.getExerciseTestcases().size() == 0)
        {
            throw new IllegalArgumentException("0 testcases");
        }

        if(exercise.getExerciseContent().getTestCode() != null)
        {
            CompileInputDTO compileInputDTO = CompileInputDTO.builder()
                    .code(exercise.getExerciseContent().getTestCode())
                    .language(Language.RUST)
                    .build();
            ExecutionConstraints constraints = ExecutionConstraints.builder()
                    .memoryLimit(200)
                    .timeLimit(10000)
                    .build();
            HashMap<String, String> result = compileService.exerciseCompile(compileInputDTO, constraints, exercise.getExerciseTestcases());
            int idx = Integer.parseInt(result.get("index"));
            long runTime = Integer.valueOf(result.get("time"));

            if(idx != exercise.getExerciseTestcases().size())
            {
                throw new IllegalArgumentException("wrong test code");
            }
            exercise.getExerciseContent().setTime(runTime);
        }
        else exercise.getExerciseContent().setTime(0);
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
        return new TupleResponseDTO<>(HttpStatus.OK.value(), exerciseService.getTotal(tag), exerciseService.getExercises(userId, pageable, tag));
    }

    @GetMapping("/exercise/difficulty")
    public TupleResponseDTO<List<Exercise>> getExercisesByTag(HttpServletRequest request, Pageable pageable, @RequestParam ExerciseDifficulty difficulty)
    {
        String userId = JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING), JwtProperties.CLAIM_NAME);
        return new TupleResponseDTO<>(HttpStatus.OK.value(), exerciseService.getTotal(difficulty), exerciseService.getExercises(userId, pageable, difficulty));
    }

    @GetMapping("/exercise/recommend")
    public Map<String,String> recommendExercise(@RequestParam Map<String,String> map, HttpServletRequest request)
    {
        String relationString = map.get("relations");
        String[] temp = relationString.split("_");

        if(relationString.equals(""))
        {
            return null;
        }

        List<ExerciseTag> relationList = new ArrayList<>();
        Arrays.stream(temp).forEach((elem)->{
            relationList.add(ExerciseTag.valueOf(elem));
        });

        List<Exercise> exerciseList = (List<Exercise>) exerciseService.getExerciseByTag(relationList);
        List<ExerciseTry> exerciseTryList = (List<ExerciseTry>) exerciseService.getExerciseTryByUsernameAndExerciseId(
                JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING),JwtProperties.CLAIM_NAME),ExerciseSolved.SOLVE,exerciseList);
        List<Exercise> listToRemove = new ArrayList<>();

        Map<Integer,ExerciseTry> exerciseTryMap = new HashMap<>();

        exerciseTryList.forEach((elem)->{
            exerciseTryMap.put(elem.getExercise_id(),elem);
        });

        exerciseList.forEach((elem)->{
            if(exerciseTryMap.containsKey(elem.getId()))
            {
                listToRemove.add(elem);
            }
        });

        exerciseList.removeAll(listToRemove);

        Random random = new Random();
        Exercise recommendExercise = exerciseList.get(random.nextInt(exerciseList.size()));

        Map<String,String> response = new HashMap<>();
        response.put("id",String.valueOf(recommendExercise.getId()));
        response.put("name",recommendExercise.getName());

        return response;
    }

    @GetMapping("/exercise/exerciseTry/{id}")
    public ResponseDTO<String> getExerciseTry(@PathVariable int id, HttpServletRequest request)
    {
        return new ResponseDTO<>(HttpStatus.OK.value(),
                exerciseService.getExerciseTryCode(id,JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING),JwtProperties.CLAIM_NAME)));
    }

    @PatchMapping("/exercise/exerciseTry/init/{id}")
    public ResponseDTO<String> initExerciseTryCode(@PathVariable int id, HttpServletRequest request)
    {
        exerciseService.initExerciseTryCode(id,
                JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING),JwtProperties.CLAIM_NAME));
        return new ResponseDTO<>(HttpStatus.OK.value(), null);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseDTO<String> illegalArgumentExceptionHandler()
    {
        return new ResponseDTO<>(HttpStatus.BAD_REQUEST.value(), null);
    }

    @ExceptionHandler(NoSuchEntityException.class)
    public ResponseDTO<String> noSuchEntityExceptionHandler()
    {
        return new ResponseDTO<>(HttpStatus.NO_CONTENT.value(), null);
    }
}
