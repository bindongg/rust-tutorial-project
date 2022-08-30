package com.rust.website.question.controller;
import com.rust.website.common.config.jwt.JwtProperties;
import com.rust.website.common.config.jwt.JwtUtil;
import com.rust.website.common.dto.TupleResponseDTO;
import com.rust.website.common.dto.ReplyDTO;
import com.rust.website.common.dto.ResponseDTO;
import com.rust.website.question.model.entity.Question;
import com.rust.website.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class QuestionController { //delete 하는 메소드 경우 나중에 받은 토큰이랑 삭제하려는 게시물 작성자 id랑 비교해서 같으면 삭제하는 기능 추가
    private final QuestionService questionService;


    @GetMapping("/question")
    public TupleResponseDTO<List<Question>> getQuestion(Pageable pageable)
    {
        return new TupleResponseDTO<>(HttpStatus.OK.value(),questionService.getTotal(),questionService.getQuestionList(pageable));
    }

    @PostMapping("/user/question/add")
    public ResponseDTO<String> addQuestion(@RequestBody Map<String,String> mp, HttpServletRequest request)
    {
        questionService.add(mp.get("title"),mp.get("content"),
                JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING),JwtProperties.CLAIM_NAME));
        return new ResponseDTO<>(HttpStatus.OK.value(),null);
    }

    @GetMapping("/question/{id}")
    public ResponseDTO<Question> getQuestionById(@PathVariable int id)
    {
        return new ResponseDTO<>(HttpStatus.OK.value(),questionService.getQuestion(id));
    }

    @PostMapping("/user/reply/add")
    public ResponseDTO<String> addReply(@RequestBody ReplyDTO replyDTO)
    {
        questionService.addReply(replyDTO);
        return new ResponseDTO<>(HttpStatus.OK.value(),null);
    }

    @PostMapping("/user/subReply/add")
    public ResponseDTO<String> addSubReply(@RequestBody ReplyDTO replyDTO)
    {
        questionService.addSubReply(replyDTO);
        return new ResponseDTO<>(HttpStatus.OK.value(),null);
    }

    @DeleteMapping("/user/question/delete/{id}")
    public ResponseDTO<String> deleteQuestion(@PathVariable int id)
    {
        questionService.deleteQuestion(id);
        return new ResponseDTO<>(HttpStatus.OK.value(),null);
    }

    @DeleteMapping("/user/reply/delete")
    public ResponseDTO<String> deleteReply(@RequestBody Map<String,Object> mp, HttpServletRequest request)
    {
        if(JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING),JwtProperties.CLAIM_NAME).equals(mp.get("author")))
        {
            questionService.deleteReply(Integer.parseInt(mp.get("id").toString()));
        }
        else
        {
            throw new IllegalArgumentException();
        }

        return new ResponseDTO<>(HttpStatus.OK.value(),null);
    }

    @DeleteMapping("/user/subReply/delete")
    public ResponseDTO<String> deleteSubReply(@RequestBody Map<String,Object> mp, HttpServletRequest request)
    {
        if(JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING),JwtProperties.CLAIM_NAME).equals(mp.get("author").toString()))
        {
            questionService.deleteSubReply(Integer.parseInt(mp.get("id").toString()));
        }
        else throw new IllegalArgumentException();
        return new ResponseDTO<>(HttpStatus.OK.value(),null);
    }

    @PutMapping("/user/question/update")
    public ResponseDTO<String> updateQuestion(@RequestBody Map<String,Object> mp, HttpServletRequest request)
    {
        if(JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING),JwtProperties.CLAIM_NAME).equals(mp.get("author").toString()))
        {
            questionService.updateQuestion(Integer.parseInt(mp.get("id").toString()),mp.get("title").toString(),mp.get("content").toString());
        }
        else throw new IllegalArgumentException();
        return new ResponseDTO<>(HttpStatus.OK.value(),null);
    }

    @PutMapping("/user/question/done")
    public ResponseDTO<String> updateQuestionDone(@RequestBody Map<String,Object> mp, HttpServletRequest request)
    {
        if(mp.get("author").toString().equals(JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING),JwtProperties.CLAIM_NAME)))
        {
            questionService.updateQuestionDone(Integer.parseInt((mp.get("id")).toString()));
            return new ResponseDTO<>(HttpStatus.OK.value(), "OK");
        }
        else
        {
            throw new IllegalArgumentException();
        }
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseDTO<Object> illegalArgumentExceptionHandler()
    {
        System.out.println("IllegalArgumentExceptionHandler");
        return new ResponseDTO<>(HttpStatus.BAD_REQUEST.value(), null);
    }
}
