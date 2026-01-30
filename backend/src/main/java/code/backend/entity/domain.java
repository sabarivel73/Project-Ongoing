package code.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "domain")
public class domain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "domain_name")
    private String domain_name;
    @Column(name = "rootUser_id")
    private Integer rootUser_id;
}
