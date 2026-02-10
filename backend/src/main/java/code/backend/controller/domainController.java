package code.backend.controller;

import code.backend.entity.iamUser;
import code.backend.service.domainAnnouncementService;
import code.backend.service.domainService;
import code.backend.service.iamUserService;
import code.backend.service.userQueriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static code.backend.constants.APIDictionary.*;

@RestController
@RequestMapping(API+ENDPOINT_2)
public class domainController {
    @Autowired private domainService ds;
    @Autowired private iamUserService iamus;
    @Autowired private domainAnnouncementService das;
    @Autowired private userQueriesService uqs;
    @PutMapping public ResponseEntity<String> editDomain(@RequestParam Integer id, @RequestParam String name) {
        return new ResponseEntity<>(ds.editDomain(id, name),HttpStatus.ACCEPTED);
    }
    @DeleteMapping public ResponseEntity<String> deleteDomain(@RequestParam Integer id) {
        return new ResponseEntity<>(ds.deleteDomain(id),HttpStatus.OK);
    }
    @PostMapping(ENDPOINT_3) public ResponseEntity<String> saveiamUser(@RequestBody iamUser value, @RequestParam Integer id,@RequestParam String domain_name) {
        return new ResponseEntity<>(iamus.saveiamUser(value, id, domain_name),HttpStatus.CREATED);
    }
    @PutMapping(ENDPOINT_3) public ResponseEntity<String> editiamUser(@RequestBody iamUser value,@RequestParam Integer id) {
        return new ResponseEntity<>(iamus.editiamUser(value, id),HttpStatus.ACCEPTED);
    }
    @DeleteMapping(ENDPOINT_3) public ResponseEntity<String> deleteiamUser(@RequestParam Integer id) {
        return new ResponseEntity<>(iamus.deleteiamUser(id),HttpStatus.OK);
    }
    @GetMapping public ResponseEntity<List<iamUser>> getAlliamUser(@RequestParam String domain_name,@RequestParam(required = false) String search) {
        return new ResponseEntity<>(iamus.getAlliamUser(domain_name,search),HttpStatus.FOUND);
    }
    @GetMapping("/{id}") public ResponseEntity<iamUser> getiamUser(@PathVariable Integer id) {
        return new ResponseEntity<>(iamus.find(id),HttpStatus.FOUND);
    }
    @GetMapping(ENDPOINT_10) public ResponseEntity<String> find_rootUser(@RequestParam String domain_name,@RequestParam Integer current_user_id) {
        return new ResponseEntity<>(ds.find_rootUser(domain_name, current_user_id),HttpStatus.OK);
    }
    @GetMapping(ENDPOINT_19) public ResponseEntity<Object> domainDashboard(@RequestParam Integer rootUser_id,@RequestParam String domain_name) {
        Integer value_1 = iamus.iamUserCount(rootUser_id, domain_name);
        Integer value_2 = das.announcementCount(domain_name);
        Integer value_3 = uqs.queriesCount(domain_name);
        Object result = "Number of IAM users : "+value_1;
        result += " and Number of announcement in this domain : "+value_2;
        result += " and Number of queries yet to response in this domain : "+value_3;
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
}
