package code.backend.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class displayChat {
    private Integer user_id;
    private String name;
    private Long readCount;
    private LocalDateTime time;

    public displayChat(Integer user_id, String name, Long readCount, LocalDateTime time) {
        this.user_id = user_id;
        this.name = name;
        this.readCount = readCount;
        this.time = time;
    }
}
