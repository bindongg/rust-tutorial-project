package com.rust.website.tutorial.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(uniqueConstraints={@UniqueConstraint(columnNames = {"number", "tutorial_id"})})
public class TutorialSub implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private int number;

    @Column(nullable = false, length = 50)
    private String name;

    @Lob
    @Column(nullable = false)
    private String content;

    @CreationTimestamp
    private Timestamp date;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tutorial_id")
    @JsonIgnoreProperties({"tutorialQuiz", "tutorialSubs"})
    private Tutorial tutorial; //foreign key
}
