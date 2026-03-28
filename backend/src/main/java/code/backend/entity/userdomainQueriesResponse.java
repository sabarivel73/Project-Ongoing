package code.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.Instant;

@Data
public class userdomainQueriesResponse {
    private Integer id;
    private String sender_name;
    private String query;
    private String response;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Kolkata")
    private Instant timestamp;

    public userdomainQueriesResponse(Integer id, String sender_name, String query, String response, Instant timestamp) {
        this.id = id;
        this.sender_name = sender_name;
        this.query = query;
        this.response = response;
        this.timestamp = timestamp;
    }
}
