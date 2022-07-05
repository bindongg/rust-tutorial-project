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

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@IdClass(TutorialSubKey.class)
public class TutorialSub implements Serializable {
    @Id
    private int id;

    @Column(nullable = false, length = 50)
    private String name;

    @Lob
    @Column(nullable = false)
    private String content;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tutorial_id")
    @JsonIgnoreProperties({"tutorialQuiz", "tutorialSubs"})
    private Tutorial tutorial; //foreign key

    @CreationTimestamp
    private Timestamp date;
}
