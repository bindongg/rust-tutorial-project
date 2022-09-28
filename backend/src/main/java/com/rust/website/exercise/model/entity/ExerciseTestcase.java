package com.rust.website.exercise.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class ExerciseTestcase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private int number;

    @Column(length = 700)
    private String input;

    @Column(nullable = false, length = 700)
    private String output;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id")
    @JsonIgnoreProperties({"exerciseTestcases, exerciseContent"})
    private Exercise exercise;

    @Override
    public String toString() {
        return "ExerciseTestcase{" +
                "id=" + id +
                ", number=" + number +
                ", input='" + input + '\'' +
                ", output='" + output + '\'' +
                '}';
    }
}
