package code.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "notes")
public class notes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "iamUser_id")
    private Integer iamUser_id;
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
