package com.rust.website.user.controller;

import com.rust.website.user.model.entity.User;
import com.rust.website.user.model.myEnum.UserAuthKey;
import com.rust.website.user.model.myEnum.UserRoleType;
import com.rust.website.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.net.ssl.SSLSession;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpHeaders;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
public class testController {

    private final UserService userService;

    @CrossOrigin("http://localhost:3000")
    @PostMapping({"/test/insert"})
    int testInsert(@RequestBody User user)
    {
        user.setRole(UserRoleType.USER);
        user.setAuthKey(UserAuthKey.INACTIVE);
        user.setEmail(user.getEmail() + "@pusan.ac.kr");
        int result = userService.register(user);
        return result;
    }
}
