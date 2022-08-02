package com.rust.website.tutorial.model.dto;

import com.rust.website.tutorial.model.entity.TutorialSub;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TutorialSubDTO {
    private TutorialSub sub;
    private TutorialSub nextSub;
    private TutorialSub preSub;
}
