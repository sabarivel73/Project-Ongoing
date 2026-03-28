package code.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Entity
@Data
@Table(name = "groupMessage")
public class groupMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "groupId")
    private Integer groupId;
    @Column(name = "sender_id")
    private Integer senderId;
    @Column(name = "domain_name")
    private String domain_name;
    @Column(name = "content")
    private String content;
    @Column(name = "attachmentKey")
    private String attachmentKey;
    @Column(name = "attachmentUrl")
    private String attachmentUrl;
    @Column(name = "attachmentType")
    private String attachmentType;
    @Column(name = "timestamp")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Kolkata")
    private Instant timestamp;
    @Column(name = "read")
    private List<Integer> read;
}
