package com.rust.website.user.service;

import com.rust.website.common.CommonProperties;
import com.rust.website.mail.service.MailService;
import com.rust.website.user.model.entity.User;
import com.rust.website.user.model.entity.UserAuth;
import com.rust.website.user.model.exception.NoSuchEntityException;
import com.rust.website.user.model.myEnum.UserAuthState;
import com.rust.website.user.repository.UserAuthRepository;
import com.rust.website.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailSendException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class UserService {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
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
    public String registerMailResent(User user, String authId)
    {
        try
        {
            Optional<User> optUser = userRepository.findByIdAndAuthState(user.getId(), UserAuthState.INACTIVE);
            if(optUser.isPresent())
            {
                Optional<UserAuth> optUserAuth = userAuthRepository.findByIdAndUsed(authId, false);
                if(optUserAuth.isPresent())
                {
                    userAuthRepository.deleteByIdAndUsed(authId, false);

                    UserAuth nUserAuth = UserAuth.builder()
                            .userId(optUser.get().getId())
                            .expirationTime(LocalDateTime.now().plusMinutes(UserAuth.EMAIL_TOKEN_EXPIRATION_TIME_VALUE))
                            .used(false)
                            .build();

                    userAuthRepository.save(nUserAuth);

                    mailService.sendAuthMail(optUser.get().getEmail(), nUserAuth.getId());

                    return nUserAuth.getId();
                }
                else
                {
                    throw new NoSuchEntityException("UserAuth entity does not exist");
                }
            }
            else
            {
                throw new NoSuchEntityException("User entity does not exist");
            }
        }
        catch (IllegalArgumentException illegalArgumentException)
        {
            throw new IllegalArgumentException();
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

    @Transactional(readOnly = true)
    public String getId(String email, String password)
    {
        Optional<User> optUser = userRepository.findByEmail(email+CommonProperties.EMAIL_POSTFIX);
        if(optUser.isPresent())
        {
            boolean match = bCryptPasswordEncoder.matches(password, optUser.get().getPassword());
            if(match)
            {
                return optUser.get().getId();
            }
            else
            {
                return null;
            }
        }
        else
        {
            return null;
        }
    }

    @Transactional
    public boolean getPassword(String id, String email)
    {
        if(userRepository.findByIdAndEmail(id, email+CommonProperties.EMAIL_POSTFIX).isPresent())
        {
            try{
                String nPassword = CommonProperties.PRJ_NAME + (new Random().nextInt(1000000));
                userRepository.findByIdAndEmail(id, email + CommonProperties.EMAIL_POSTFIX).get().setPassword(bCryptPasswordEncoder.encode(nPassword));
                mailService.sendPasswordMail(email + CommonProperties.EMAIL_POSTFIX, nPassword);

                return true;
            }
            catch (MailSendException mailSendException) {
                throw new MailSendException("mail transmission failed");
            }
        }
        else
        {
            return false;
        }
    }

    @Transactional
    public void updatePassword(String username, String password, String newPassword)
    {
        Optional<User> optUser = userRepository.findById(username);
        if(optUser.isPresent())
        {
            if(bCryptPasswordEncoder.matches(password,optUser.get().getPassword()))
            {
                optUser.get().setPassword(bCryptPasswordEncoder.encode(newPassword));
            }
            else
            {
                throw new IllegalArgumentException();
            }
        }
        else
        {
            throw new NoSuchEntityException();
        }
    }

    @Transactional
    public void test(User user)
    {
        userRepository.save(user);
    }
}
