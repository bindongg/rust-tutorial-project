package com.rust.website.question.service;

import com.rust.website.common.config.jwt.JwtProperties;
import com.rust.website.common.config.jwt.JwtUtil;
import com.rust.website.common.dto.ReplyDTO;
import com.rust.website.question.model.entity.Question;
import com.rust.website.question.model.entity.Reply;
import com.rust.website.question.repository.QuestionRepository;
import com.rust.website.question.repository.ReplyRepository;
import com.rust.website.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    private final ReplyRepository replyRepository;

    @Transactional
    public void add(String title, String content, String username)
    {
        Question question = Question.builder()
                .title(title)
                .content(content)
                .user(userRepository.findById(username).orElseThrow(()->new IllegalArgumentException("No such element")))
                .done(false)
                .build();
        questionRepository.save(question);
    }

    @Transactional
    public void addReply(ReplyDTO replyDTO)
    {
        Reply reply = Reply.builder()
                .content(replyDTO.getContent())
                .question(questionRepository.findById(replyDTO.getParent()).orElseThrow(()->new IllegalArgumentException("No such entity")))
                .user(userRepository.findById(replyDTO.getUserId()).orElseThrow(()->new IllegalArgumentException("No such Entity")))
                .build();
        replyRepository.save(reply);
    }

    @Transactional(readOnly = true)
    public long getTotal()
    {
        return questionRepository.count();
    }

    @Transactional(readOnly = true)
    public List<Question> getQuestionList(Pageable pageable)
    {
        return questionRepository.findAllByOrderByIdDesc(pageable).getContent();
    }

    @Transactional(readOnly = true)
    public Question getQuestion(int id)
    {
        return questionRepository.findById(id).orElseThrow(()->new IllegalArgumentException("No such entity"));
    }
}
