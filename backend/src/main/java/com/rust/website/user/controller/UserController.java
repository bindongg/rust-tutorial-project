package com.rust.website.user.controller;

import com.rust.website.mail.service.MailService;
import com.rust.website.user.model.entity.User;
import com.rust.website.user.model.entity.UserAuth;
import com.rust.website.user.model.myEnum.UserAuthState;
import com.rust.website.user.model.myEnum.UserRoleType;
import com.rust.website.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @CrossOrigin("http://localhost:3000")
    @PostMapping({"/user/duplicateId"})
    boolean checkDuplicateId(@RequestBody User user)
    {
        return userService.checkDuplicateId(user.getId());
    }

    @CrossOrigin("http://localhost:3000")
    @PostMapping({"/user/duplicateEmail"})
    boolean checkDuplicateEmail(@RequestBody User user)
    {
        return userService.checkDuplicateEmail(user.getEmail());
    }

    @CrossOrigin("http://localhost:3000")
    @PostMapping({"/user/register"})
    void addUser(@RequestBody User user)
    {
        user.setRole(UserRoleType.USER);
        user.setAuthState(UserAuthState.INACTIVE);
        user.setEmail(user.getEmail() + "@pusan.ac.kr");

        UserAuth userAuth = new UserAuth(user.getId());

        userService.register(user,userAuth);
    }

    @GetMapping("/authConfirm/{authId}")
    void authConfirm(@PathVariable String authId)
    {
        userService.confirmAuth(authId);
    }
}
