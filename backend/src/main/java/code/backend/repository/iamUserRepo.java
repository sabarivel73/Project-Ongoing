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
    @Query(value = "select * from iam_user where domain_name like :domain_name_value and (:search_value is null or (name like :search_1_value or name like :search_2_value))",nativeQuery = true)
    List<iamUser> findAll(@Param("domain_name_value") String domain_name,@Param("search_value") String search,@Param("search_1_value") String search_1,@Param("search_2_value") String search_2);
    @Transactional @Modifying @Query(value = "Delete from iam_user where domain_name like :domain_name_value",nativeQuery = true)
    Integer deleteiamUserDomain(@Param("domain_name_value") String domain_name);
    @Query(value = "select * from iam_user where domain_name like :domain_name_value and name like :name_value",nativeQuery = true)
    iamUser login(@Param("domain_name_value") String domain_name,@Param("name_value") String name);
    @Query(value = "select count(*) from iam_user where root_user_id = :rootUser_id_value and (:domain_name_value is null or domain_name like :domain_name_value)",nativeQuery = true)
    Integer iamUserCount(@Param("rootUser_id_value") Integer rootUser_id,@Param("domain_name_value") String domain_name);
}
