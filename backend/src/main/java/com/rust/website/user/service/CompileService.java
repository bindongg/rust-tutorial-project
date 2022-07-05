package com.rust.website.user.service;

import com.rust.website.tutorial.model.model.CompileInputModel;
import com.rust.website.tutorial.model.model.CompileOutputModel;

import java.io.IOException;

public interface CompileService {
    public CompileOutputModel onlineCompile(CompileInputModel compileInputModel) throws IOException;
}
