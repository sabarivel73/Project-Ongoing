package code.backend.repository;

import code.backend.entity.notes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface notesRepo extends JpaRepository<notes,Integer> {
    @Query(value = "select * from notes where iam_user_id = :iamUser_id_value order by timestamp desc",nativeQuery = true)
    List<notes> get_notes(@Param("iamUser_id_value") Integer iamUser_id);
}
