package com.rust.website.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReplyDTO {
    int parent; //일반 댓글의 경우 게시글의 id 대댓글의 경우 댓글의 id
    String userId;
    String content;
}
