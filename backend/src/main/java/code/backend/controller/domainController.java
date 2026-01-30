package code.backend.controller;

import code.backend.entity.iamUser;
import code.backend.service.domainService;
import code.backend.service.iamUserService;
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
    @PutMapping public ResponseEntity<String> editDomain(@RequestParam Integer id, @RequestParam String name) {
        return new ResponseEntity<>(ds.editDomain(id, name),HttpStatus.ACCEPTED);
    }
    @DeleteMapping public ResponseEntity<String> deleDomain(@RequestParam Integer id) {
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
    @GetMapping public ResponseEntity<List<iamUser>> getAlliamUser(@RequestParam String domain_name) {
        return new ResponseEntity<>(iamus.getAlliamUser(domain_name),HttpStatus.FOUND);
    }
    @GetMapping("/{id}") public ResponseEntity<iamUser> getiamUser(@PathVariable Integer id) {
        return new ResponseEntity<>(iamus.find(id),HttpStatus.FOUND);
    }
}
