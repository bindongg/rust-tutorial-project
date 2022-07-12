package com.rust.website.user.repository;

import com.rust.website.user.model.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface UserAuthRepository extends JpaRepository<UserAuth, String> {
    Optional<UserAuth> findByIdAndExpirationTimeAfterAndUsed(String confirmationTokenId, LocalDateTime now, boolean expired);

    Optional<UserAuth> findByIdAndUsed(String id, boolean used);
    void deleteByIdAndUsed(String id, boolean used);
}
