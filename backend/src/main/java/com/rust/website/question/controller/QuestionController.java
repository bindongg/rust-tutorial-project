package com.rust.website.question.controller;

import com.rust.website.common.config.jwt.JwtProperties;
import com.rust.website.common.config.jwt.JwtUtil;
import com.rust.website.common.dto.QuestionDTO;
import com.rust.website.common.dto.QuestionResponseDTO;
import com.rust.website.common.dto.ResponseDTO;
import com.rust.website.question.model.entity.Question;
import com.rust.website.question.service.QuestionService;
import com.rust.website.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class QuestionController {
    private final QuestionService questionService;

    @GetMapping("/question")
    public QuestionResponseDTO<List<Question>> getQuestion(Pageable pageable)
    {
        return new QuestionResponseDTO<>(200,questionService.getTotal(),questionService.getQuestionList(pageable));
    }

    @PostMapping("/user/question/add")
    public ResponseDTO<String> addQuestion(@RequestBody Map<String,String> mp, HttpServletRequest request)
    {
        questionService.add(mp.get("title"),mp.get("content"),
                JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING),JwtProperties.CLAIM_NAME));
        return new ResponseDTO<>(200,"OK");
    }

    @GetMapping("/question/{id}")
    public ResponseDTO<Question> getQuestionById(@PathVariable int id)
    {
        return new ResponseDTO<>(200,questionService.getQuestion(id));
    }
}
