package com.rust.website.user.service;

import com.rust.website.mail.service.MailService;
import com.rust.website.user.model.entity.User;
import com.rust.website.user.model.entity.UserAuth;
import com.rust.website.user.model.myEnum.UserAuthState;
import com.rust.website.user.repository.UserAuthRepository;
import com.rust.website.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final MailService mailService;
    private final UserRepository userRepository;
    private final UserAuthRepository userAuthRepository;

    @Transactional(readOnly = true)
    public boolean checkDuplicateId(String id) {
        return userRepository.existsById(id);
    }

    @Transactional(readOnly = true)
    public boolean checkDuplicateEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Transactional
    public void register(User user, UserAuth userAuth) {
        userRepository.save(user);
        userAuthRepository.save(userAuth);
        mailService.sendAuthMail(user.getEmail(),userAuth.getId());
    }

    @Transactional
    public void confirmAuth(String authId) //구조 수정 -> exception을 던지게
    {
        Optional<UserAuth> optUserAuth = userAuthRepository.findByIdAndExpirationTimeAfterAndUsed(authId, LocalDateTime.now(), false);
        if(optUserAuth.isPresent())
        {
            UserAuth userToAuth = optUserAuth.get();
            Optional<User> optUser = userRepository.findById(userToAuth.getUserId());
            if(optUser.isPresent())
            {
                userToAuth.setUsed(true);
                User user = optUser.get();
                user.setAuthState(UserAuthState.ACTIVE);
            }
        }
    }
}
