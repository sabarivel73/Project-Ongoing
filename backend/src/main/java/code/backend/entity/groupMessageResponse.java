package code.backend.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class groupMessageResponse {
    private Integer id;
    private Integer sender_id;
    private String sender_name;
    private String content;
    private String attachment_type;
    private String attachment_url;
    private String attachment_key;
    private LocalDateTime timestamp;

    public groupMessageResponse(Integer id, Integer sender_id, String sender_name, String content, String attachment_type, String attachment_url, String attachment_key, LocalDateTime timestamp) {
        this.id = id;
        this.sender_id = sender_id;
        this.sender_name = sender_name;
        this.content = content;
        this.attachment_type = attachment_type;
        this.attachment_url = attachment_url;
        this.attachment_key = attachment_key;
        this.timestamp = timestamp;
    }
}
