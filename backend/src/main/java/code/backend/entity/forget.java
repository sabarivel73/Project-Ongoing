package code.backend.entity;

import lombok.Data;

@Data
public class forget {
    private Integer user_id;
    private String email;

    public forget(Integer user_id, String email) {
        this.user_id = user_id;
        this.email = email;
    }
}
