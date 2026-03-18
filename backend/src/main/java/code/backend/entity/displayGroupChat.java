package code.backend.entity;

import lombok.Data;

@Data
public class displayGroupChat {
    private Integer id;
    private Integer createdBy;
    private String group_name;
    private String domain_name;
    private Long readCount;

    public displayGroupChat(Integer id, Integer createdBy, String group_name, String domain_name, Long readCount) {
        this.id = id;
        this.createdBy = createdBy;
        this.group_name = group_name;
        this.domain_name = domain_name;
        this.readCount = readCount;
    }
}
