package com.rust.website.user.controller;

import com.rust.website.common.dto.LoginDTO;
import com.rust.website.common.dto.RegisterDTO;
import com.rust.website.common.dto.ResponseDTO;
import com.rust.website.common.dto.MailResendDTO;
import com.rust.website.user.model.entity.User;
import com.rust.website.user.model.entity.UserAuth;
import com.rust.website.user.model.exception.LoginException;
import com.rust.website.user.model.exception.NoSuchEntityException;
import com.rust.website.user.model.myEnum.UserAuthState;
import com.rust.website.user.model.myEnum.UserRoleType;
import com.rust.website.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailSendException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
public class UserController {

    private final UserService userService;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping({"/duplicateId"})
   public ResponseDTO<Boolean> checkDuplicateId(@RequestBody Map<String,String> duplicateIdMap)
   {
       return new ResponseDTO<>(HttpStatus.OK.value(), userService.checkDuplicateId(duplicateIdMap.get("id")));
   }
    @PostMapping({"/duplicateEmail"})
    public ResponseDTO<Boolean> checkDuplicateEmail(@RequestBody Map<String,String> duplicateEmailMap)
    {
        return new ResponseDTO<>(HttpStatus.OK.value(), userService.checkDuplicateEmail(duplicateEmailMap.get("email")));
    }

    @PostMapping({"/register"})
    public ResponseDTO<String> addUser(@RequestBody RegisterDTO registerDTO)
    {
        User user = User.builder()
                .id(registerDTO.getUserId())
                .email(registerDTO.getUserEmail() + "@pusan.ac.kr")
                .password(bCryptPasswordEncoder.encode(registerDTO.getUserPassword()))
                .authState(UserAuthState.INACTIVE)
                .role(UserRoleType.USER)
                .build();

        UserAuth userAuth = UserAuth.builder()
                .userId(registerDTO.getUserId())
                .build();

        String authId = userService.register(user,userAuth);

        return new ResponseDTO<>(HttpStatus.OK.value(), authId);
    }

    @PostMapping({"/register/resend"})
    public ResponseDTO<String> addUserMailResent(@RequestBody MailResendDTO mailResendDTO)
    {
        User user = new User();
        user.setId(mailResendDTO.getId());
        user.setPassword(mailResendDTO.getPassword());
        user.setEmail(mailResendDTO.getEmail());

        String authId = userService.registerMailResent(user, mailResendDTO.getAuthId());

        return new ResponseDTO<>(HttpStatus.OK.value(), authId);
    }

    @GetMapping ("/authConfirm/{authId}")
    public String authConfirm(@PathVariable String authId)
    {
        userService.confirmAuth(authId);
        return "인증 완료되었습니다";
    }

    /**@PostMapping("/login")
    public ResponseDTO<Object>void login(@RequestBody LoginDTO loginDTO)
    {
        Optional<User> optUser = userService.loginCheck(loginDTO);
        if(optUser.isPresent())
        {
            if(optUser.get().getPassword().equals(loginDTO.getUserPwd()) && optUser.get().getAuthState().equals(UserAuthState.ACTIVE))
            {
                System.out.println("good input");
                return new ResponseDTO<>(HttpStatus.OK.value(), null);
            }
            else
            {
                System.out.println("bad input");
                throw new LoginException();
            }
        }
        else
        {
            System.out.println("bad input");
            throw new LoginException();
        }
    }*/

    @GetMapping("/user/findId")
    public void tt()
    {
        System.out.println("find");
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

    @ExceptionHandler(LoginException.class)
    protected ResponseDTO<String> temp4()
    {
        return new ResponseDTO<>(HttpStatus.BAD_REQUEST.value(), "LoginException");
    }

    @ExceptionHandler(Exception.class)
    protected ResponseDTO<String> temp0()
    {
        return new ResponseDTO<>(HttpStatus.BAD_REQUEST.value(), "Exception");
    }
}
