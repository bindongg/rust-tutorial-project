package com.rust.website.exercise.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class ExerciseContent implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 700)
    private String description;

    @Column(nullable = false, length = 700)
    private String input_description;

    @Column(nullable = false, length = 700)
    private String output_description;

    @Column(nullable = false, length = 700)
    private String input_value;

    @Column(nullable = false, length = 700)
    private String output_value;

    @Lob
    @Column(nullable = false)
    private String code;

    @OneToOne
    @JoinColumn(name = "exercise_id", unique = true, nullable = false)
    @JsonIgnoreProperties({"exerciseContent", "exerciseTestcases"})
    private Exercise exercise;

    @Transient
    public void copy(ExerciseContent newExerciseContent)
    {
        this.description = newExerciseContent.getDescription();
        this.input_description = newExerciseContent.getInput_description();
        this.output_description = newExerciseContent.getOutput_description();
        this.input_value = newExerciseContent.getInput_value();
        this.output_value = newExerciseContent.getOutput_value();
        this.code = newExerciseContent.getCode();
    }
}
