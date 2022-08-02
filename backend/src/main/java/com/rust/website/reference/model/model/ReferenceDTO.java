package com.rust.website.reference.model.model;

import com.rust.website.reference.model.entitiy.Reference;
import com.rust.website.tutorial.model.entity.TutorialSub;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReferenceDTO {
    private Reference ref;
    private Reference nextRef;
    private Reference preRef;
}
