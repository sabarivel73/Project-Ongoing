package code.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table (name = "message")
public class message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "sender_id")
    private Integer sender_id;
    @Column(name = "receiver_id")
    private Integer receiver_id;
    @Column(name = "content")
    private String content;
    @Column(name = "attachmentType")
    private String attachmentType;
    @Column(name = "attachmentUrl")
    private String attachmentUrl;
    @Column(name = "attachmentKey")
    private String attachmentKey;
    @Column(name = "timestamp")
    private LocalDateTime timestamp;
}
