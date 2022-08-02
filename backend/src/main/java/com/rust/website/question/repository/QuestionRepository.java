package com.rust.website.question.repository;

import com.rust.website.question.model.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    Page<Question> findAllByOrderByIdDesc(Pageable pageable);
}
