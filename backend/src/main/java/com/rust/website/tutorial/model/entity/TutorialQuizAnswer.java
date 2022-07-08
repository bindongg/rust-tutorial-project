package com.rust.website.tutorial.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"number", "tutorialQuiz_id"})})
public class TutorialQuizAnswer implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private int number;

    @Column(nullable = false)
    private int answer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tutorialQuiz_id")
    @JsonIgnoreProperties({"tutorial", "tutorialAnswers"})
    private TutorialQuiz tutorialQuiz;
}
