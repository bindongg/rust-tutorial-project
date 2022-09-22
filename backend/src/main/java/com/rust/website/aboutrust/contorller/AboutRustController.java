package com.rust.website.aboutrust.contorller;

import com.rust.website.aboutrust.model.entity.AboutRust;
import com.rust.website.aboutrust.model.myEnum.AboutType;
import com.rust.website.aboutrust.service.AboutRustService;
import com.rust.website.common.dto.ResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class AboutRustController {
    private final AboutRustService aboutRustService;

    @GetMapping("/aboutRust/{aboutType}")
    public ResponseDTO<AboutRust> getAboutRustPage(@PathVariable AboutType aboutType)
    {
        return aboutRustService.getPage(aboutType);
    }

    @PatchMapping("/aboutRust")
    public ResponseDTO<String> updateAboutRustPage(@RequestBody AboutRust aboutRust)
    {
        return aboutRustService.updatePage(aboutRust);
    }
}
