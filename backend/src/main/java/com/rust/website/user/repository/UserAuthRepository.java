package com.rust.website.user.repository;

import com.rust.website.user.model.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface UserAuthRepository extends JpaRepository<UserAuth, String> {
}
