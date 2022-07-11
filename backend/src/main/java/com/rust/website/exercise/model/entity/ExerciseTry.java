package com.rust.website.exercise.model.entity;

import com.rust.website.exercise.model.myEnum.ExerciseSolved;
import com.rust.website.tutorial.model.entity.Tutorial;
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

    @ManyToOne //many exerciseTries one user
    @JoinColumn(name = "user_id", nullable = false)
    private User user; //foreign key

    @ManyToOne
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    public int getExercise_id()
    {
        return exercise.getId();
    }
}
