package com.rust.website.user.service;

import com.rust.website.user.model.entity.UserAuth;
import com.rust.website.user.repository.UserAuthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserAuthService {

    private final UserAuthRepository userAuthRepository;
    @Transactional
    public void register(UserAuth userAuth)
    {
        userAuthRepository.save(userAuth);
    }

    @Transactional
    public Optional<UserAuth> confirmAuth(String authId)
    {
        Optional<UserAuth> userAuth = userAuthRepository.findByIdAndExpirationTimeAfterAndUsed(authId, LocalDateTime.now(), false);
        return userAuth;
    }
}
