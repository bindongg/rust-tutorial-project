package com.rust.website.user.service;

import com.rust.website.user.model.entity.User;
import com.rust.website.user.model.myEnum.UserAuthKey;
import com.rust.website.user.model.myEnum.UserRoleType;
import com.rust.website.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public int register(User user)
    {
        user.setRole(UserRoleType.USER);
        user.setAuthKey(UserAuthKey.INACTIVE);
        try{
            userRepository.save(user);
        }catch(Exception e)
        {
            return -1;
        }
        return 1;
    }

    @Transactional(readOnly = true)
    public boolean checkDuplicate(String id)
    {
        boolean check = userRepository.existsById(id);
        return check;
    }
}
