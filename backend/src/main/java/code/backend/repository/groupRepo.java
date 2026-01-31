package code.backend.repository;

import code.backend.entity.group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface groupRepo extends JpaRepository<group,Integer> {
    @Transactional @Modifying @Query(value = "delete from group_table where id = :id_value",nativeQuery = true)
    void delete_group(@Param("id_value") Integer id);
    @Query(value = "select * from group_table where id = :id_value and created_by = :current_user_id_value",nativeQuery = true)
    group find_createdBy(@Param("id_value") Integer id, @Param("current_user_id_value") Integer current_user_id);
    @Query(value="select * from group_table where domain_name like :domain_name_value",nativeQuery = true)
    List<group> subscriber_group(@Param("domain_name_value") String domain_name);
}
