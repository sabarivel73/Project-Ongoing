package code.backend.repository;

import code.backend.entity.groupMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface groupMessageRepo extends JpaRepository<groupMessage,Integer> {
    @Query(value = "select * from group_message where group_id = :group_id_value and domain_name like :domain_name_value",nativeQuery = true)
    List<groupMessage> get_message(@Param("group_id_value") Integer group_id,@Param("domain_name_value") String domain_name);
    @Transactional @Modifying @Query(value = "delete from group_message where id = :id_value",nativeQuery = true)
    int delete_message(@Param("id_value") Integer id);
    @Query(value = "select * from group_message where sender_id = :sender_id_value",nativeQuery = true)
    List<groupMessage> find_sender(@Param("sender_id_value") Integer sender_id);
    @Transactional @Modifying @Query(value = "delete from group_message where group_id = :group_id_value",nativeQuery = true)
    int delete_allMessage(@Param("group_id_value") Integer group_id);
}
