package com.rust.website.tutorial.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.rust.website.tutorial.model.entity.TutorialQuiz;
import com.rust.website.tutorial.model.entity.TutorialSub;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Tutorial {
    @Id
    private int id;

    @Column(nullable = false, length = 20)
    private String name;

    @CreationTimestamp
    private Timestamp date;

    @OneToMany(mappedBy = "tutorial", fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"tutorial", "content"})
    private List<TutorialSub> tutorialSubs;

    @OneToOne(mappedBy = "tutorial", fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"tutorial", "content"})
    private TutorialQuiz tutorialQuiz;
}
