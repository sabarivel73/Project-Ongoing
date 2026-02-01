package code.backend.repository;

import code.backend.entity.validation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface validationRepo extends JpaRepository<validation, Integer> {
    @Transactional @Modifying @Query(value = "delete from validation where now() - interval '2 minutes' >= timestamp",nativeQuery = true)
    void delete_validation();
}
