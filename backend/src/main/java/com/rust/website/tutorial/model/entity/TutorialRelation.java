package com.rust.website.tutorial.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rust.website.exercise.model.myEnum.ExerciseTag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class TutorialRelation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    @ManyToOne
    @JoinColumn(name = "tutorial_id")
    @JsonIgnore
    Tutorial tutorial;

    @Nullable
    @Enumerated(EnumType.STRING)
    ExerciseTag exerciseTag;
}
