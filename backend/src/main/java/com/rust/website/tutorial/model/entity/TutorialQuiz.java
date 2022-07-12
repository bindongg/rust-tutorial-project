package com.rust.website.tutorial.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class TutorialQuiz implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 50)
    private String name;

    @Lob
    @Column(nullable = false)
    private String content;

    @CreationTimestamp
    private Timestamp date;

    @OneToOne
    @JoinColumn(name="tutorial_id", unique = true, nullable = false)
    @JsonIgnoreProperties({"tutorialQuiz", "tutorialSubs"})
    private Tutorial tutorial; //foreign key

    @OneToMany(mappedBy = "tutorialQuiz", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"tutorialQuiz"})
    private List<TutorialQuizAnswer> tutorialQuizAnswers;

}
