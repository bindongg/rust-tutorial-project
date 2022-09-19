package com.rust.website.compile.model.myEnum;

import lombok.Getter;

@Getter
public enum Language {
    CPP("cpp"),
    PYTHON("py"),
    JAVA("java"),
    RUST("rs");

    private final String lang;
    Language(String lang) { this.lang = lang;}
}
