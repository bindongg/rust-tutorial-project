package com.rust.compile.controller;

import com.rust.compile.model.User;
import com.rust.compile.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @CrossOrigin("http://localhost:3000")
    @PostMapping({"/user/duplicate"})
    boolean returnTest(@RequestBody User user) //그냥 string 으로 받으면 이상하게 끝에 =가 추가로 붙어서 작동 안함
    {
        boolean check = userService.checkDuplicate(user.getId());
        return check;
    }
}
