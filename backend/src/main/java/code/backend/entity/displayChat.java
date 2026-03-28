package code.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
public class displayChat {
    private Integer user_id;
    private String name;
    private Long readCount;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Kolkata")
    private Instant time;

    public displayChat(Integer user_id, String name, Long readCount, Instant time) {
        this.user_id = user_id;
        this.name = name;
        this.readCount = readCount;
        this.time = time;
    }
}
