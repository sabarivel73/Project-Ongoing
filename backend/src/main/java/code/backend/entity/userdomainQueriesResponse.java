package code.backend.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class userdomainQueriesResponse {
    private Integer id;
    private String sender_name;
    private String query;
    private String response;
    private LocalDateTime timestamp;

    public userdomainQueriesResponse(Integer id, String sender_name, String query, String response, LocalDateTime timestamp) {
        this.id = id;
        this.sender_name = sender_name;
        this.query = query;
        this.response = response;
        this.timestamp = timestamp;
    }
}
