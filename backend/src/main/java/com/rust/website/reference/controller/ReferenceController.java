package com.rust.website.reference.controller;


import com.rust.website.common.dto.ResponseDTO;
import com.rust.website.reference.model.entitiy.Reference;
import com.rust.website.reference.service.ReferenceService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
public class ReferenceController {
    private final ReferenceService referenceService;

    @GetMapping("/reference")
    public ResponseDTO<List<Reference>> getReferences()
    {
        return referenceService.getReferences();
    }

    @GetMapping("/reference/{id}")
    public ResponseDTO<Reference> getReference(@PathVariable int id)
    {
        return referenceService.getReference(id);
    }

    @PostMapping("/reference")
    public ResponseDTO<String> addReference(@RequestBody Reference reference)
    {
        return referenceService.addReference(reference);
    }

    @PatchMapping("/reference/{id}")
    public ResponseDTO<String> updateReference(@PathVariable int id, @RequestBody Reference reference)
    {
        return referenceService.updateReference(id, reference);
    }

    @DeleteMapping("/reference/{id}")
    public ResponseDTO<String> getReferences(@PathVariable int id)
    {
        return referenceService.deleteReference(id);
    }
}
