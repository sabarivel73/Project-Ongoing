package code.backend.repository;

import code.backend.entity.forget;
import code.backend.entity.rootUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface rootUserRepo extends JpaRepository<rootUser,Integer> {
    @Query(value = "select id from root_user where name like :name_value",nativeQuery = true)
    Integer rootUserID(@Param("name_value") String name);
    @Query(value = "select * from root_user where name like :name_value",nativeQuery = true)
    rootUser login(@Param("name_value") String name);
    @Query(value = "select id,email,name from root_user where email like :email_value",nativeQuery = true)
    forget email(@Param("email_value") String email);
}
