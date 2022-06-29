package com.rust.website.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {
    @GetMapping(value = "/testing")
    public String goTest() {
        return "test";
    }
}
