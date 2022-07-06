package com.rust.website.user.model.exception;

public class NoSuchEntityException extends RuntimeException{
    private static final String message = "Such Entity does not exist";
    public NoSuchEntityException()
    {
        super(message);
    }

    public NoSuchEntityException(String msg)
    {
        super(msg);
    }
}
