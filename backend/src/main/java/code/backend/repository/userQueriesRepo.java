package code.backend.repository;

import code.backend.entity.userQueries;
import code.backend.entity.userdomainQueriesResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface userQueriesRepo extends JpaRepository<userQueries,Integer> {
    @Query(value = "select * from user_queries where sender_id = :iamUser_id_value order by timestamp",nativeQuery = true)
    List<userQueries> get_queries(@Param("iamUser_id_value") Integer iamUser_id);
    @Query(value = "select t2.id,t1.name,t2.query,t2.response,t2.timestamp from iam_user as t1 join (select * from user_queries where domain_name like :domain_name_value) as t2 on t1.id = t2.sender_id order by t2.timestamp",nativeQuery = true)
    List<userdomainQueriesResponse> get_domainQueries(@Param("domain_name_value") String domain_name);
}
