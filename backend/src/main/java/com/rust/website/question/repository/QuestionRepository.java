package com.rust.website.question.repository;

import com.rust.website.question.model.entity.Question;
import com.rust.website.question.model.entity.myEnum.QuestionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    Page<Question> findAllByOrderByIdDesc(Pageable pageable); //id author title done date만 가져오게 수정

    Page<Question> findAllByQuestionTypeOrderByIdDesc(Pageable pageable, QuestionType questionType);
    long countByQuestionType(QuestionType questionType);
    Optional<Question> findById(int id);
}
