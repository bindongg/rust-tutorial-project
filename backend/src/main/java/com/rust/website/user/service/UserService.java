package com.rust.website.user.service;

import com.rust.website.mail.service.MailService;
import com.rust.website.user.ResponseDTO.ResponseDTO;
import com.rust.website.user.model.entity.User;
import com.rust.website.user.model.entity.UserAuth;
import com.rust.website.user.model.exception.NoSuchEntityException;
import com.rust.website.user.model.myEnum.UserAuthState;
import com.rust.website.user.repository.UserAuthRepository;
import com.rust.website.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailSendException;
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

        try {
            return userRepository.existsById(id);
        }
        catch (IllegalArgumentException illegalArgumentException) {
            throw new IllegalArgumentException("id input required");
        }
    }

    @Transactional(readOnly = true)
    public boolean checkDuplicateEmail(String email) {
        try {
            return userRepository.existsByEmail(email);
        }
        catch (IllegalArgumentException illegalArgumentException) {
            throw new IllegalArgumentException("email input required");
        }
    }

    @Transactional
    public String register(User user, UserAuth userAuth) {
        try {
            userRepository.save(user);
            userAuthRepository.save(userAuth);
            mailService.sendAuthMail(user.getEmail(), userAuth.getId());

            return userAuth.getId();
        }
        catch (IllegalArgumentException illegalArgumentException) {
            throw new IllegalArgumentException("User or UserAuth addition failed");
        }
        catch (MailSendException mailSendException) {
            throw new MailSendException("mail transmission failed");
        }
    }

    @Transactional
    public void confirmAuth(String authId)
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
            else
            {
                throw new NoSuchEntityException("User entity does not exist");
            }
        }
        else
        {
            throw new NoSuchEntityException("UserAuth entity does not exist");
        }
    }
}
