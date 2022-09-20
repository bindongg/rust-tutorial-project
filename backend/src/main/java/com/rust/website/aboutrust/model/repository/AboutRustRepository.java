package com.rust.website.aboutrust.model.repository;

import com.rust.website.aboutrust.model.entity.AboutRust;
import com.rust.website.aboutrust.model.myEnum.AboutType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AboutRustRepository extends JpaRepository<AboutRust, Integer> {
    public Optional<AboutRust> findByAboutType(AboutType aboutType);
}
