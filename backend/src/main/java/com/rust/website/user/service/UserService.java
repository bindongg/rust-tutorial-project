package com.rust.website.user.service;

import com.rust.website.user.model.entity.User;
import com.rust.website.user.repository.UserAuthRepository;
import com.rust.website.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void register(User user) {
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public boolean checkDuplicate(String id) {
        boolean check = userRepository.existsById(id);
        return check;
    }
}
