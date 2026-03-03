package code.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "iam_user")
public class iamUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "password")
    private String password;
    @Column(name = "domain_name")
    private String domain_name;
    @Column(name = "role")
    private String role;
    @Column(name = "rootUser_id")
    private Integer rootUser_id;

    public iamUser() {}

    public iamUser(Integer id, String name, String password, String domain_name, String role, Integer rootUser_id) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.domain_name = domain_name;
        this.role = role;
        this.rootUser_id = rootUser_id;
    }
}