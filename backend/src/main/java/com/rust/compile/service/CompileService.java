package com.rust.compile.service;

import com.rust.compile.model.CompileInputModel;
import com.rust.compile.model.CompileOutputModel;

import java.io.IOException;

public interface CompileService {
    public CompileOutputModel onlineCompile(CompileInputModel compileInputModel) throws IOException;
}
