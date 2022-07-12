package com.rust.website.user.model.exception;

public class NoSuchEntityException extends RuntimeException{
    public NoSuchEntityException()
    {

    }
    public NoSuchEntityException(String msg)
    {
        super(msg);
    }
}
