package com.rust.website.exercise.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.rust.website.exercise.model.myEnum.ExerciseDifficulty;
import com.rust.website.exercise.model.myEnum.ExerciseSolved;
import com.rust.website.exercise.model.myEnum.ExerciseTag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private int number;

    @Column(nullable = false, length = 100)
    private String name;

    @Enumerated(EnumType.STRING)
    private ExerciseDifficulty difficulty;

    @Enumerated(EnumType.STRING)
    private ExerciseTag tag;

    @CreationTimestamp
    private Timestamp date;

    @OneToOne(mappedBy = "exercise", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"exercise"})
    private ExerciseContent exerciseContent;

    @OneToMany(mappedBy = "exercise", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"exercise"})
    @OrderBy(value = "number ASC")
    private List<ExerciseTestcase> exerciseTestcases;

    @Transient
    private ExerciseSolved solved;

    public void copy(Exercise newExercise)
    {
        this.number = newExercise.getNumber();
        this.name = newExercise.getName();
        this.difficulty = newExercise.getDifficulty();
        this.tag = newExercise.getTag();
    }

}
