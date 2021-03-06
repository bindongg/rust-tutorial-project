package com.rust.website.user.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.rust.website.exercise.model.entity.ExerciseTry;
import com.rust.website.tutorial.model.entity.TutorialDone;
import com.rust.website.user.model.myEnum.UserAuthState;
import com.rust.website.user.model.myEnum.UserRoleType;
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
public class User {

    @Id
    private String id;

    @Column(nullable = false, length = 50, unique = true)
    private String email;

    @Column(nullable = false, length = 100)
    private String password;

    @Enumerated(EnumType.STRING)
    private UserRoleType role;

    @Enumerated(EnumType.STRING)
    private UserAuthState authState;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"user"})
    private List<ExerciseTry> exerciseTry;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"user"})
    private List<TutorialDone> tutorialDone;

    @CreationTimestamp
    private Timestamp date;


    //@LastModifiedDate
    //private Timestamp updateDate;


}
