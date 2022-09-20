package com.rust.website.aboutrust.model.entity;

import com.rust.website.aboutrust.model.myEnum.AboutType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class AboutRust {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String title;

    @Lob
    @Column
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AboutType aboutType;
}
