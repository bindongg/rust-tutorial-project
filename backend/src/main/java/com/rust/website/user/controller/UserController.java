package com.rust.website.user.controller;

import com.auth0.jwt.exceptions.TokenExpiredException;
import com.rust.website.common.CommonProperties;
import com.rust.website.common.cache.RedisService;
import com.rust.website.common.config.jwt.JwtProperties;
import com.rust.website.common.config.jwt.JwtUtil;
import com.rust.website.common.dto.RegisterDTO;
import com.rust.website.common.dto.ResponseDTO;
import com.rust.website.common.dto.MailResendDTO;
import com.rust.website.common.dto.TupleResponseDTO;
import com.rust.website.exercise.model.entity.Exercise;
import com.rust.website.exercise.model.entity.ExerciseTry;
import com.rust.website.exercise.model.myEnum.ExerciseSolved;
import com.rust.website.question.model.entity.Question;
import com.rust.website.user.model.entity.User;
import com.rust.website.user.model.entity.UserAuth;
import com.rust.website.user.model.exception.LoginException;
import com.rust.website.user.model.exception.NoSuchEntityException;
import com.rust.website.user.model.myEnum.UserAuthState;
import com.rust.website.user.model.myEnum.UserRoleType;
import com.rust.website.user.repository.UserRepository;
import com.rust.website.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailSendException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping({"/duplicateId"})
    public ResponseDTO<Boolean> checkDuplicateId(@RequestBody Map<String, String> duplicateIdMap) {
        return new ResponseDTO<>(HttpStatus.OK.value(), userService.checkDuplicateId(duplicateIdMap.get("id")));
    }

    @PostMapping({"/duplicateEmail"})
    public ResponseDTO<Boolean> checkDuplicateEmail(@RequestBody Map<String, String> duplicateEmailMap) {
        return new ResponseDTO<>(HttpStatus.OK.value(), userService.checkDuplicateEmail(duplicateEmailMap.get("email")));
    }

    @PostMapping({"/register"})
    public ResponseDTO<String> addUser(@RequestBody RegisterDTO registerDTO) {
        User user = User.builder()
                .id(registerDTO.getUserId())
                .email(registerDTO.getUserEmail() + CommonProperties.EMAIL_POSTFIX)
                .password(bCryptPasswordEncoder.encode(registerDTO.getUserPassword()))
                .authState(UserAuthState.INACTIVE)
                .role(UserRoleType.ROLE_USER)
                .build();

        UserAuth userAuth = UserAuth.builder()
                .userId(registerDTO.getUserId())
                .expirationTime(LocalDateTime.now().plusMinutes(UserAuth.EMAIL_TOKEN_EXPIRATION_TIME_VALUE))
                .used(false)
                .build();

        String authId = userService.register(user, userAuth);

        return new ResponseDTO<>(HttpStatus.OK.value(), authId);
    }

    @PostMapping({"/register/resend"})
    public ResponseDTO<String> addUserMailResent(@RequestBody MailResendDTO mailResendDTO) {
        User user = new User();
        user.setId(mailResendDTO.getId());
        user.setPassword(mailResendDTO.getPassword());
        user.setEmail(mailResendDTO.getEmail());

        String authId = userService.registerMailResent(user, mailResendDTO.getAuthId());

        return new ResponseDTO<>(HttpStatus.OK.value(), authId);
    }

    @PatchMapping("/authConfirm/{authId}")
    public ResponseDTO<String> authConfirm(@PathVariable String authId) {
        userService.confirmAuth(authId);
        return new ResponseDTO<>(HttpStatus.OK.value(), "인증이 완료되었습니다");
    }

    @PostMapping("/id")
    public ResponseDTO<String> getId(@RequestBody Map<String,String> getIdMap)
    {
        String id = userService.getId(getIdMap.get("email"),getIdMap.get("password"));
        if(id == null)
        {
            return new ResponseDTO<>(HttpStatus.BAD_REQUEST.value(), null);
        }
        else return new ResponseDTO<>(HttpStatus.OK.value(), id);
    }

    @PostMapping("/password")
    public ResponseDTO<String> getPassword(@RequestBody Map<String,String> getPasswordMap)
    {
        boolean res = userService.getPassword(getPasswordMap.get("id"), getPasswordMap.get("email"));
        if(res)
        {
            return new ResponseDTO<>(HttpStatus.OK.value(), "OK");
        }
        else
        {
            return new ResponseDTO<>(HttpStatus.BAD_REQUEST.value(), "FaIL");
        }
    }

    @PostMapping("/user/password")
    public ResponseDTO<String> updatePassword(@RequestBody Map<String,String> getNewPasswordMap, HttpServletRequest request)
    {
        userService.updatePassword(JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING), JwtProperties.CLAIM_NAME),
                getNewPasswordMap.get("password"), getNewPasswordMap.get("newPassword"));
        return new ResponseDTO<>(HttpStatus.OK.value(), "OK");
    }

    @GetMapping("/user/email/{username}")
    public ResponseDTO<String> getEmail(@PathVariable String username, HttpServletRequest request)
    {
        String email = userService.getUser(username).getEmail();
        if(!email.equals(JwtUtil.getClaim(request.getHeader(JwtProperties.HEADER_STRING),JwtProperties.CLAIM_NAME)))
        {
            return new ResponseDTO<>(HttpStatus.FORBIDDEN.value(), null);
        }
        return new ResponseDTO<>(HttpStatus.OK.value(), email);
    }

    @PostMapping("/admin/auth")
    public ResponseDTO<String> updateAuthority(@RequestBody Map<String,String> getNewAuthMap)
    {
        userService.updateAuthority(getNewAuthMap.get("id"), getNewAuthMap.get("role"));
        return new ResponseDTO<>(200,"OK");
    }
    @GetMapping("/user/exercise/success/{userId}")
    public TupleResponseDTO<List<ExerciseTry>> getExerciseDone(@PathVariable String userId, Pageable pageable)
    {
        return new TupleResponseDTO<>(200,userService.getTriedExerciseCount(userId,ExerciseSolved.SOLVE),userService.getTriedExercise(userId, ExerciseSolved.SOLVE, pageable));
    }

    @GetMapping("/user/exercise/fail/{userId}")
    public TupleResponseDTO<List<ExerciseTry>> getExerciseFail(@PathVariable String userId, Pageable pageable)
    {
        return new TupleResponseDTO<>(200,userService.getTriedExerciseCount(userId,ExerciseSolved.FAIL),userService.getTriedExercise(userId, ExerciseSolved.FAIL, pageable));
    }

    @GetMapping("/admin/user/{id}")
    public ResponseDTO<User> getUser(@PathVariable String id)
    {
        return new ResponseDTO<>(HttpStatus.OK.value(), userService.getUser(id));
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

    @ExceptionHandler(TokenExpiredException.class)
    public ResponseDTO<String> temp5()
    {
        return new ResponseDTO<>(HttpStatus.FORBIDDEN.value(), "TokenExpiredException");
    }

    @ExceptionHandler(Exception.class)
    protected ResponseDTO<String> temp0()
    {
        return new ResponseDTO<>(HttpStatus.BAD_REQUEST.value(), "Exception");
    }
}
