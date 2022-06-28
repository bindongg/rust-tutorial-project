package com.rust.compile.model;

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
    private UserAuthKey authKey;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<ExerciseTry> exerciseTry;

    //@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    //private List<TutorialDone> tutorialDone;

    @CreationTimestamp
    private Timestamp date;
}
