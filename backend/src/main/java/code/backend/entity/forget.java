package code.backend.entity;

import lombok.Data;

@Data
public class forget {
    private Integer user_id;
    private String email;
    private String name;

    public forget(Integer user_id, String email, String name) {
        this.user_id = user_id;
        this.email = email;
        this.name = name;
    }
}
