package com.rust.website.user.service;

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

    private final UserRepository userRepository;
    private final UserAuthRepository userAuthRepository;

    @Transactional(readOnly = true)
    public boolean checkDuplicate(String id) {
        boolean check = userRepository.existsById(id);
        return check;
    }

    @Transactional
    public void register(User user, UserAuth userAuth) {
        userRepository.save(user);
        userAuthRepository.save(userAuth);
    }

    @Transactional
    public void confirmAuth(String authId)
    {
        Optional<UserAuth> optUserAuth = userAuthRepository.findByIdAndExpirationTimeAfterAndUsed(authId, LocalDateTime.now(), false);
        UserAuth userToAuth = optUserAuth.get(); //isPresent 추가
        Optional<User> optUser = userRepository.findById(userToAuth.getUserId());
        userToAuth.setUsed(true);
        User user = optUser.get();
        user.setAuthState(UserAuthState.ACTIVE);
    }
}
