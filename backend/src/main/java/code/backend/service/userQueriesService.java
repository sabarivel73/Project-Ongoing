package code.backend.service;

import code.backend.entity.userQueries;
import code.backend.repository.userQueriesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class userQueriesService {
    @Autowired private userQueriesRepo uqr;
    public String send_query(Integer sender_id,String domain_name,String query,String response) {
        userQueries value = new userQueries();
        value.setSender_id(sender_id);
        value.setDomain_name(domain_name);
        value.setQuery(query);
        value.setResponse(response);
        value.setTimestamp(LocalDateTime.now());
        uqr.save(value);
        return "Query sent successfully";
    }
    public List<userQueries> get_queries(Integer iamUser_id) {
        return uqr.get_queries(iamUser_id);
    }
    public String delete_query(Integer id) {
        uqr.deleteById(id);
        return "Query deleted successfully";
    }
    public List<userQueries> get_domainQueries(String domain_name) {
        return uqr.get_domainQueries(domain_name);
    }
    public String update_response(Integer id,String response) {
        userQueries value = uqr.findById(id).orElse(null);
        if(value==null) return "No query found";
        value.setResponse(response);
        uqr.save(value);
        return "Response updated";
    }
}
