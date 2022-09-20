package com.rust.website.exercise.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.rust.website.exercise.model.myEnum.ExerciseSolved;
import com.rust.website.user.model.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class ExerciseTry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Lob
    @Column(nullable = false)
    private String sourceCode;

    @Enumerated(EnumType.STRING)
    private ExerciseSolved solved;

    @CreationTimestamp
    private Timestamp date;

    @ManyToOne(fetch = FetchType.LAZY) //many exerciseTries one user
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user; //foreign key

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id", nullable = false)
    @JsonIgnoreProperties({"exerciseContent","exerciseTestcases"})
    private Exercise exercise;

    public int getExercise_id()
    {
        return exercise.getId();
    }
}
