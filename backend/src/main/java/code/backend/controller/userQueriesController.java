package code.backend.controller;

import code.backend.entity.userQueries;
import code.backend.entity.userdomainQueriesResponse;
import code.backend.service.userQueriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static code.backend.constants.APIDictionary.*;

@RestController
@RequestMapping(API+ENDPOINT_16)
public class userQueriesController {
    @Autowired private userQueriesService uqs;
    @PostMapping public ResponseEntity<String> send_query(@RequestParam Integer sender_id,@RequestParam String domain_name,@RequestParam String query,@RequestParam(required = false) String response) {
        return new ResponseEntity<>(uqs.send_query(sender_id, domain_name, query, response), HttpStatus.CREATED);
    }
    @GetMapping public ResponseEntity<List<userQueries>> get_queries(@RequestParam Integer iamUser_id) {
        return new ResponseEntity<>(uqs.get_queries(iamUser_id),HttpStatus.OK);
    }
    @DeleteMapping public ResponseEntity<String> delete_query(@RequestParam Integer id) {
        return new ResponseEntity<>(uqs.delete_query(id),HttpStatus.OK);
    }
    @GetMapping(ENDPOINT_1) public ResponseEntity<List<userdomainQueriesResponse>> get_domainQueries(@RequestParam String domain_name) {
        return new ResponseEntity<>(uqs.get_domainQueries(domain_name),HttpStatus.OK);
    }
    @PutMapping(ENDPOINT_1) public ResponseEntity<String> update_response(@RequestParam Integer id, @RequestParam String response) {
        return new ResponseEntity<>(uqs.update_response(id,response),HttpStatus.OK);
    }
}
