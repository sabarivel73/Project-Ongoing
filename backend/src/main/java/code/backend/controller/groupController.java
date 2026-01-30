package code.backend.controller;

import code.backend.entity.group;
import code.backend.service.groupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static code.backend.constants.APIDictionary.*;

@RestController
@RequestMapping(API+ENDPOINT_7)
public class groupController {
    @Autowired private groupService gs;
    @PostMapping public ResponseEntity<String> create_group(@RequestParam Integer createdBy,@RequestParam String group_name,@RequestParam String domain_name) {
        return new ResponseEntity<>(gs.create_group(createdBy, group_name, domain_name), HttpStatus.CREATED);
    }
    @PostMapping(ENDPOINT_8) public ResponseEntity<String> add_subscriber(@RequestParam Integer group_id,@RequestParam Integer subscriber_id) {
        return new ResponseEntity<>(gs.add_subscriber(group_id, subscriber_id), HttpStatus.CREATED);
    }
    @DeleteMapping public ResponseEntity<String> delete_group(@RequestParam Integer id) {
        return new ResponseEntity<>(gs.delete_group(id),HttpStatus.OK);
    }
    @GetMapping(ENDPOINT_10) public ResponseEntity<List<group>> find_createdBy(@RequestParam Integer createdBy) {
        return new ResponseEntity<>(gs.find_createdBy(createdBy),HttpStatus.OK);
    }
    @GetMapping(ENDPOINT_11) public ResponseEntity<List<group>> subscriber_group(@RequestParam Integer subscriber_id,@RequestParam String domain_name) {
        return new ResponseEntity<>(gs.subscriber_group(subscriber_id, domain_name),HttpStatus.OK);
    }
    @DeleteMapping(ENDPOINT_12) public ResponseEntity<String> leave_group(@RequestParam Integer group_id,@RequestParam Integer subscriber_id) {
        return new ResponseEntity<>(gs.leave_group(group_id, subscriber_id),HttpStatus.OK);
    }
}
