package code.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "domainAnnouncement")
public class domainAnnouncement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "rootUser_id")
    private Integer rootUser_id;
    @Column(name = "domain_name")
    private String domain_name;
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
