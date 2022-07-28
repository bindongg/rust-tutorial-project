package com.rust.website.user.repository;

import com.rust.website.user.model.entity.User;
import com.rust.website.user.model.myEnum.UserAuthState;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByEmail(String email);

    Optional<User> findByIdAndAuthState(String id, UserAuthState authState);

    Optional<User> findByEmail(String email);

    Optional<User> findByIdAndEmail(String id, String email);

    void deleteByIdAndAuthState(String id, UserAuthState authState);
}
