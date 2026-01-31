package code.backend.repository;

import code.backend.entity.domain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface domainRepo extends JpaRepository<domain,Integer> {
    @Query(value = "select id from domain where domain_name like :name_value and root_user_id = :id_value",nativeQuery = true)
    Integer domain_id(@Param("name_value") String name,@Param("id_value") Integer id);
    @Query(value = "select * from domain where root_user_id = :id_value",nativeQuery = true)
    List<domain> findAll(@Param("id_value") Integer id);
    @Query(value = "select id from domain where root_user_id = :id_value",nativeQuery = true)
    List<Integer> idsrootUserDomain(@Param("id_value") Integer id);
    @Query(value = "select * from domain where domain_name like :domain_name_value and root_user_id = :current_user_id_value",nativeQuery = true)
    domain find_rootUser(@Param("domain_name_value") String domain_name,@Param("current_user_id_value") Integer current_user_id);
}
