package code.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
@Table(name = "group_table")
public class group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "createdBy")
    private Integer createdBy;
    @Column(name = "group_name")
    private String group_name;
    @Column(name = "domain_name")
    private String domain_name;
    @Column(name = "subscribers")
    private List<Integer> subscribers;
}
