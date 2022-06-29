package com.rust.website.exersie.model.entity;

import com.rust.website.exersie.model.myEnum.ExerciseSolved;
import com.rust.website.user.model.entity.User;
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
public class ExerciseTry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Lob
    @Column(nullable = false)
    private String sourceCode;

    @ManyToOne //many exerciseTries one user
    @JoinColumn(name = "userId")
    private User user; //foreign key

    @Enumerated(EnumType.STRING)
    private ExerciseSolved solved;

    @CreationTimestamp
    private Timestamp date;
}
