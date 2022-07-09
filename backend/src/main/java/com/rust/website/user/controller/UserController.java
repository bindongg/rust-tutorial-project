package com.rust.website.user.controller;

import com.rust.website.user.ResponseDTO.ResponseDTO;
import com.rust.website.user.model.entity.MailResendObject;
import com.rust.website.user.model.entity.User;
import com.rust.website.user.model.entity.UserAuth;
import com.rust.website.user.model.exception.NoSuchEntityException;
import com.rust.website.user.model.myEnum.UserAuthState;
import com.rust.website.user.model.myEnum.UserRoleType;
import com.rust.website.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailSendException;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    @CrossOrigin("http://localhost:3000")
    @PostMapping({"/user/duplicateId"})
    public ResponseDTO<Boolean> checkDuplicateId(@RequestBody User user)
    {
        return new ResponseDTO<>(HttpStatus.OK.value(), userService.checkDuplicateId(user.getId()));
    }

    @CrossOrigin("http://localhost:3000")
    @PostMapping({"/user/duplicateEmail"})
    public ResponseDTO<Boolean> checkDuplicateEmail(@RequestBody User user)
    {
        return new ResponseDTO<>(HttpStatus.OK.value(), userService.checkDuplicateEmail(user.getEmail()));
    }

    @CrossOrigin("http://localhost:3000")
    @PostMapping({"/user/register"})
    public ResponseDTO<String> addUser(@RequestBody User user)
    {
        user.setRole(UserRoleType.USER);
        user.setAuthState(UserAuthState.INACTIVE);
        user.setEmail(user.getEmail() + "@pusan.ac.kr");

        UserAuth userAuth = new UserAuth(user.getId());

        String authId = userService.register(user,userAuth);

        return new ResponseDTO<>(HttpStatus.OK.value(), authId);
    }

    @CrossOrigin("http://localhost:3000")
    @PostMapping({"/user/register/resend"})
    public ResponseDTO<String> addUserMailResent(@RequestBody MailResendObject mailResendObject)
    {
        User user = new User();
        user.setId(mailResendObject.getId());
        user.setPassword(mailResendObject.getPassword());
        user.setEmail(mailResendObject.getEmail());

        String authId = userService.registerMailResent(user, mailResendObject.getAuthId());

        return new ResponseDTO<>(HttpStatus.OK.value(), authId);
    }

    @GetMapping ("/user/authConfirm/{authId}")
    public String authConfirm(@PathVariable String authId)
    {
        userService.confirmAuth(authId);
        return "인증 완료되었습니다";
    }

    @ExceptionHandler(IllegalArgumentException.class)
    protected ResponseDTO<String> temp()
    {
        return new ResponseDTO<>(HttpStatus.BAD_REQUEST.value(), "IllegalArgumentException"); //temp
    }

    @ExceptionHandler(MailSendException.class)
    protected ResponseDTO<String> temp2()
    {
        return new ResponseDTO<>(HttpStatus.BAD_REQUEST.value(), "MailSendException"); //temp
    }

    @ExceptionHandler(NoSuchEntityException.class)
    protected ResponseDTO<String> temp3()
    {
        return new ResponseDTO<>(HttpStatus.BAD_REQUEST.value(), "NoSuchEntityException"); //temp
    }

    @ExceptionHandler(Exception.class)
    protected ResponseDTO<String> temp4()
    {
        return new ResponseDTO<>(HttpStatus.BAD_REQUEST.value(), "Exception");
    }
}
