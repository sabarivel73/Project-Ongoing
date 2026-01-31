package code.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "userQueries")
public class userQueries {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "sender_id")
    private Integer sender_id;
    @Column(name = "domain_name")
    private String domain_name;
    @Column(name = "query")
    private String query;
    @Column(name = "response")
    private String response;
    @Column(name = "timestamp")
    private LocalDateTime timestamp;
}
