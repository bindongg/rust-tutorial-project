package com.rust.website.reference.service;

import com.rust.website.common.dto.ResponseDTO;
import com.rust.website.reference.model.entitiy.Reference;
import com.rust.website.reference.model.model.ReferenceDTO;
import com.rust.website.reference.repository.ReferenceRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@AllArgsConstructor
@Service
public class ReferenceService {
    private final ReferenceRepository referenceRepository;

    @Transactional(readOnly = true)
    public ResponseDTO<List<Reference>> getReferences()
    {
        ResponseDTO<List<Reference>> responseDTO = new ResponseDTO<>(HttpStatus.OK.value(), null);
        responseDTO.setData(referenceRepository.findReferences());
        return responseDTO;
    }

    @Transactional(readOnly = true)
    public ResponseDTO<ReferenceDTO> getReference(@PathVariable int id)
    {
        ResponseDTO<ReferenceDTO> responseDTO = new ResponseDTO<>(HttpStatus.OK.value(), null);
        ReferenceDTO referenceDTO = ReferenceDTO.builder()
                .ref(referenceRepository.findById(id).get())
                .nextRef(referenceRepository.findNextReference(id))
                .preRef(referenceRepository.findPreReference(id))
                .build();
        responseDTO.setData(referenceDTO);
        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> addReference(Reference reference)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<>(HttpStatus.OK.value(), "추가가 완료되었습니다.");
        referenceRepository.save(reference);
        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> updateReference(int id, Reference newReference)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<>(HttpStatus.OK.value(), "수정이 완료되었습니다.");
        Reference reference = referenceRepository.findById(id).get();
        reference.copy(newReference);

        return responseDTO;
    }

    @Transactional
    public ResponseDTO<String> deleteReference(int id)
    {
        ResponseDTO<String> responseDTO = new ResponseDTO<>(HttpStatus.OK.value(), "삭제가 완료되었습니다.");
        referenceRepository.deleteById(id);
        return responseDTO;
    }
}
