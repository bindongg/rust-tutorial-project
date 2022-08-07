package com.rust.website.question.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
public class SubReply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Lob
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"exerciseTry", "tutorialDone", "email"})
    private User user;

    @ManyToOne
    @JoinColumn(name = "reply_id")
    @JsonIgnoreProperties({"content", "question_", "subReply", "createDate", "user"})
    private Reply reply;

    @CreationTimestamp
    private Timestamp createDate;
}
