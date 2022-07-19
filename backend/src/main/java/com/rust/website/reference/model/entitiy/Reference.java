package com.rust.website.reference.model.entitiy;

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
@Entity
@Builder
public class Reference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 50)
    private String name;

    @Lob
    private String content;

    @Column
    private int number;

    @CreationTimestamp
    private Timestamp date;

    public void copy(Reference newReference)
    {
        this.name = newReference.getName();
        this.content = newReference.getContent();
        this.number = newReference.getNumber();
    }
}
