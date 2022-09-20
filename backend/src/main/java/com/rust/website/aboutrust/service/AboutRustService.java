package com.rust.website.aboutrust.service;

import com.rust.website.aboutrust.model.entity.AboutRust;
import com.rust.website.aboutrust.model.myEnum.AboutType;
import com.rust.website.aboutrust.model.repository.AboutRustRepository;
import com.rust.website.common.dto.ResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AboutRustService {
    private final AboutRustRepository aboutRustRepository;

    @Transactional(readOnly = true)
    public ResponseDTO<AboutRust> getPage(AboutType aboutType)
    {
        ResponseDTO<AboutRust> responseDTO = new ResponseDTO<>(200, null);
        AboutRust aboutRust = aboutRustRepository.findByAboutType(aboutType).orElse(AboutRust.builder().aboutType(aboutType).build());
        responseDTO.setData(aboutRust);
        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> updatePage(AboutRust aboutRust)
    {
        System.out.println(aboutRust);
        ResponseDTO<String> responseDTO = new ResponseDTO<>(200, "수정이 완료되었습니다.");
        Optional<AboutRust> optional = aboutRustRepository.findById(aboutRust.getId());
        if (optional.isPresent())
        {
            AboutRust myAboutRust = optional.get();
            myAboutRust.setTitle(aboutRust.getTitle());
            myAboutRust.setContent(aboutRust.getContent());
        }
        else
        {
            aboutRustRepository.save(aboutRust);
        }
        return responseDTO;
    }
}
