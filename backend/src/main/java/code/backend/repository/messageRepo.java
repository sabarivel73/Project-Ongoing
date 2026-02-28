package code.backend.repository;

import code.backend.entity.displayChat;
import code.backend.entity.message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface messageRepo extends JpaRepository<message,Integer> {
    @Query(value = "select * from message where (sender_id = :sender_id_value or sender_id = :receiver_id_value) and (receiver_id = :sender_id_value or receiver_id = :receiver_id_value) order by timestamp desc",nativeQuery = true)
    List<message> get_messages(@Param("sender_id_value") Integer sender_id,@Param("receiver_id_value") Integer receiver_id);
    @Transactional @Modifying @Query(value = "delete from message where id = :id_value",nativeQuery = true)
    void delete_message(@Param("id_value") Integer id);
    @Query(value = "select * from message where id = :id_value and sender_id = :current_user_id_value",nativeQuery = true)
    message find_sender(@Param("id_value") Integer id,@Param("current_user_id_value") Integer current_user_id);
    @Query(value = "select distinct case when sender_id = :id_value then receiver_id when receiver_id = :id_value then sender_id end as user_id,timestamp from message order by timestamp desc",nativeQuery = true)
    List<displayChat> chat(@Param("id_value") Integer id);
}
