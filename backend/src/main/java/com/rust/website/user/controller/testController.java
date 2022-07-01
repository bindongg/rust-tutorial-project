package com.rust.website.user.controller;

import com.rust.website.mail.service.MailService;
import com.rust.website.user.model.entity.User;
import com.rust.website.user.model.myEnum.UserAuthState;
import com.rust.website.user.model.myEnum.UserRoleType;
import com.rust.website.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class testController {
/*
    private final UserService userService;
    private final MailService mailService;

    @CrossOrigin("http://localhost:3000")
    @PostMapping({"/test/insert"})
    int testInsert(@RequestBody User user)
    {
        user.setRole(UserRoleType.USER);
        user.setEmail(user.getEmail() + "@pusan.ac.kr");
        //int result = userService.register(user);
        mailService.sendMail(user);
        return 0;
    }*/
}
