package code.backend.repository;

import code.backend.entity.groupMessage;
import code.backend.entity.groupMessageResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface groupMessageRepo extends JpaRepository<groupMessage,Integer> {
    @Query(value = "select t2.id,t2.sender_id,t1.name as sender_name,t2.content,t2.attachment_type,t2.attachment_url,t2.attachment_key,t2.timestamp from iam_user as t1 join (select * from group_message where group_id = :group_id_value and domain_name like :domain_name_value) as t2 on t1.id = t2.sender_id order by t2.timestamp desc;",nativeQuery = true)
    List<groupMessageResponse> get_message(@Param("group_id_value") Integer group_id, @Param("domain_name_value") String domain_name);
    @Transactional @Modifying @Query(value = "delete from group_message where id = :id_value",nativeQuery = true)
    void delete_message(@Param("id_value") Integer id);
    @Query(value = "select * from group_message where id = :id_value and sender_id = :current_user_id_value",nativeQuery = true)
    groupMessage find_sender(@Param("id_value") Integer id, @Param("current_user_id_value") Integer current_user_id);
    @Transactional @Modifying @Query(value = "delete from group_message where group_id = :group_id_value",nativeQuery = true)
    void delete_allMessage(@Param("group_id_value") Integer group_id);
}