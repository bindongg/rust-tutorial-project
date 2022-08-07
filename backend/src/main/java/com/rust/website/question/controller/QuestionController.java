package com.rust.website.question.controller;
import com.rust.website.common.config.jwt.JwtProperties;
import com.rust.website.common.config.jwt.JwtUtil;
import com.rust.website.common.dto.QuestionResponseDTO;
import com.rust.website.common.dto.ReplyDTO;
import com.rust.website.common.dto.ResponseDTO;
import com.rust.website.question.model.entity.Question;
import com.rust.website.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class QuestionController { //delete 하는 메소드 경우 나중에 받은 토큰이랑 삭제하려는 게시물 작성자 id랑 비교해서 같으면 삭제하는 기능 추가
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
        return new ResponseDTO<>(200,null);
    }

    @GetMapping("/question/{id}")
    public ResponseDTO<Question> getQuestionById(@PathVariable int id)
    {
        return new ResponseDTO<>(200,questionService.getQuestion(id));
    }

    @PostMapping("/user/reply/add")
    public ResponseDTO<String> addReply(@RequestBody ReplyDTO replyDTO)
    {
        questionService.addReply(replyDTO);
        return new ResponseDTO<>(200,null);
    }

    @PostMapping("/user/subReply/add")
    public ResponseDTO<String> addSubReply(@RequestBody ReplyDTO replyDTO)
    {
        questionService.addSubReply(replyDTO);
        return new ResponseDTO<>(200,null);
    }

    @DeleteMapping("/user/question/delete/{id}")
    public ResponseDTO<String> deleteQuestion(@PathVariable int id)
    {
        questionService.deleteQuestion(id);
        return new ResponseDTO<>(200,null);
    }

    @DeleteMapping("/user/reply/delete/{id}")
    public ResponseDTO<String> deleteReply(@PathVariable int id)
    {
        questionService.deleteReply(id);
        return new ResponseDTO<>(200,null);
    }

    @DeleteMapping("/user/subReply/delete/{id}")
    public ResponseDTO<String> deleteSubReply(@PathVariable int id)
    {
        questionService.deleteSubReply(id);
        return new ResponseDTO<>(200,null);
    }

    @PutMapping("/user/question/update")
    public ResponseDTO<String> updateQuestion(@RequestBody Map<String,Object> mp)
    {
        questionService.updateQuestion(Integer.parseInt(mp.get("id").toString()),mp.get("title").toString(),mp.get("content").toString());
        return new ResponseDTO<>(200,null);
    }
}
