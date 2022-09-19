package com.rust.website.tutorial.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class TutorialQuizQuestion implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private int number;

    @Column(nullable = false, length = 700)
    private String title;

    @Column(nullable = false, length = 700)
    private String choice1;

    @Column(nullable = false, length = 700)
    private String choice2;

    @Column(nullable = false, length = 700)
    private String choice3;

    @Column(nullable = false, length = 700)
    private String choice4;

    @Column(nullable = false)
    private int answer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tutorialQuiz_id", nullable = false)
    @JsonIgnoreProperties({"tutorial", "tutorialQuizQuestions"})
    private TutorialQuiz tutorialQuiz;
}
