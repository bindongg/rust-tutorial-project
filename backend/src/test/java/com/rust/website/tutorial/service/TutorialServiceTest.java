package com.rust.website.tutorial.service;

import com.rust.website.tutorial.model.model.CompileInput;
import com.rust.website.tutorial.model.model.CompileOutput;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = {CompileService.class})
public class TutorialServiceTest {
    @Autowired
    private CompileService compileService;

    @Test
    @DisplayName("컴파일 테스트")
    public void compileTest() {
        CompileInput input = CompileInput.builder()
                .code("fn main(){ " +
            "let mut line = String::new(); " +
            "std::io::stdin().read_line(&mut line); " +
            "println!(\"Hello ,{}\", line);" +
            "}")
                .stdIn("hdm")
                .build();
        CompileOutput output = null;
        try {
            output = compileService.onlineCompile(input);
        } catch(Exception e) {
            e.printStackTrace();
        }

        Assertions.assertEquals("Hello ,hdm", output.getStdOut());
    }

}
