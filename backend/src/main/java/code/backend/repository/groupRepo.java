package code.backend.repository;

import code.backend.entity.displayGroupChat;
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
    @Query(value="select t1.id,t1.created_by,t1.group_name,t1.domain_name,coalesce(t2.v,0) as readCount from (select * from group_table where :iamUser_id_value = any(subscribers) and domain_name like :domain_name_value) as t1 left join (select group_id,count(*) as v from group_message where domain_name like :domain_name_value and :iamUser_id_value != all(read) group by group_id) as t2 on t1.id = t2.group_id",nativeQuery = true)
    List<displayGroupChat> subscriber_group(@Param("iamUser_id_value") Integer iamUser_id, @Param("domain_name_value") String domain_name);
    @Query(value = "select id from group_table where group_name like :group_name_value and domain_name like :domain_name_value",nativeQuery = true)
    Integer group_exist(@Param("group_name_value") String group_name, @Param("domain_name_value") String domain_name);
}
