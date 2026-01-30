package code.backend.repository;

import code.backend.entity.iamUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface iamUserRepo extends JpaRepository<iamUser,Integer> {
    @Query(value = "select id from iam_user where name like :name_value and domain_name like :domain_name_value",nativeQuery = true)
    Integer iamUserID(@Param("name_value") String name,@Param("domain_name_value") String domain_name);
    @Query(value = "select * from iam_user where domain_name like :domain_name_value",nativeQuery = true)
    List<iamUser> findAll(@Param("domain_name_value") String domain_name);
    @Transactional @Modifying @Query(value = "Delete from iam_user where domain_name like :domain_name_value",nativeQuery = true)
    Integer deleteiamUserDomain(@Param("domain_name_value") String domain_name);
    @Query(value = "select * from iam_user where domain_name like :domain_name_value and name like :name_value",nativeQuery = true)
    iamUser login(@Param("domain_name_value") String domain_name,@Param("name_value") String name);
}
