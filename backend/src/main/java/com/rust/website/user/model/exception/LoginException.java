package com.rust.website.user.model.exception;

public class LoginException extends RuntimeException{
    public LoginException()
    {

    }
    public LoginException(String msg)
    {
        super(msg);
    }
}
