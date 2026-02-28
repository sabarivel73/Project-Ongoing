package code.backend.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class displayChat {
    private Integer user_id;
    private LocalDateTime time;

    public displayChat(Integer user_id, LocalDateTime time) {
        this.user_id = user_id;
        this.time = time;
    }
}
