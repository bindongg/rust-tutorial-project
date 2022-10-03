package com.rust.website.question.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.rust.website.question.model.entity.myEnum.QuestionType;
import com.rust.website.user.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 50)
    private String title;

    @Lob
    private String content;

    @Enumerated(EnumType.STRING)
    private QuestionType questionType;

    @Column(nullable = true)
    private Integer exerciseId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"exerciseTry", "tutorialDone", "email"})
    private User user;

    @OneToMany(mappedBy = "question_", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private List<Reply> reply;

    @Column
    private boolean done;

    @CreationTimestamp
    private Timestamp createDate;
}
