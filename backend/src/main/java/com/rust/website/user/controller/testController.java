package com.rust.website.user.controller;

import com.rust.website.user.model.entity.User;
import com.rust.website.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class testController {

    private final UserService userService;

    @CrossOrigin("http://localhost:3000")
    @PostMapping({"/test/insert"})
    int testInsert(@RequestBody User user)
    {
        int result = userService.register(user);
        System.out.println(result);
        return result;
    }
}
