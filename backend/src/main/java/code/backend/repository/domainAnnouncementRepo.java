package code.backend.repository;

import code.backend.entity.domainAnnouncement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;

public interface domainAnnouncementRepo extends JpaRepository<domainAnnouncement,Integer> {
    @Query(value = "select * from domain_announcement where domain_name like :domain_name_value order by timestamp desc",nativeQuery = true)
    List<domainAnnouncement> get_allAnnouncement(@Param("domain_name_value") String domain_name);
    @Query(value = "select count(*) as v from domain_announcement where domain_name like :domain_name_value",nativeQuery = true)
    Integer announcementCount(@Param("domain_name_value") String domain_name);
}
