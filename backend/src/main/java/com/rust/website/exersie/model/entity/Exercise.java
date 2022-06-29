package com.rust.website.exersie.model.entity;

import com.rust.website.exersie.model.myEnum.ExerciseDifficulty;
import com.rust.website.exersie.model.myEnum.ExerciseTag;
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
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 100)
    private String name;

    @Lob
    @Column(nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    private ExerciseDifficulty difficulty;

    @Enumerated(EnumType.STRING)
    private ExerciseTag tag;

    @CreationTimestamp
    private Timestamp date;
}
