package code.backend.controller;

import code.backend.entity.*;
import code.backend.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

import static code.backend.constants.APIDictionary.*;

@RestController
@RequestMapping(API+ENDPOINT_1)
public class rootUserController {
    @Autowired private rootUserService rus;
    @Autowired private domainService ds;
    @Autowired private iamUserService iamus;
    @PostMapping public ResponseEntity<String> saveUser(@RequestBody @Valid rootUser value) {
        return new ResponseEntity<>(rus.saveUser(value), HttpStatus.CREATED);
    }
    @PutMapping public ResponseEntity<String> editUser(@RequestParam Integer id,@RequestParam(required = false) String name,@RequestParam(required = false) String mail) {
        return new ResponseEntity<>(rus.editUser(id,name,mail),HttpStatus.ACCEPTED);
    }
    @DeleteMapping public ResponseEntity<String> deleteUser(@RequestParam Integer id) {
        return new ResponseEntity<>(rus.deleteUser(id),HttpStatus.OK);
    }
    @PostMapping(ENDPOINT_2) public ResponseEntity<String> saveDomain(@RequestParam String name, @RequestParam Integer id) {
        return new ResponseEntity<>(ds.saveDomain(name,id), HttpStatus.CREATED);
    }
    @GetMapping public ResponseEntity<List<Object>> getAllDomains(@RequestParam Integer id,@RequestParam(required = false) String search) {
        return new ResponseEntity<>(ds.getAllDomain(id,search),HttpStatus.FOUND);
    }
    @GetMapping("/{id}") public ResponseEntity<domain> getDomain(@PathVariable Integer id) {
        return new ResponseEntity<>(ds.find(id), HttpStatus.FOUND);
    }
    @GetMapping(ENDPOINT_17) public ResponseEntity<Object> sendMail(@RequestParam String mail) throws IOException {
        return new ResponseEntity<>(rus.sendMail(mail),HttpStatus.OK);
    }
    @GetMapping(ENDPOINT_18) public ResponseEntity<String> validation(@RequestParam Integer id,@RequestParam Integer value) {
        return new ResponseEntity<>(rus.validation(id, value),HttpStatus.OK);
    }
    @GetMapping(ENDPOINT_19) public ResponseEntity<Object> dashboard(@RequestParam Integer rootUser_id) {
        Integer value_1 = ds.domainCount(rootUser_id); Integer value_2 = iamus.iamUserCount(rootUser_id,null);
        return new ResponseEntity<>("Number of domains : "+value_1+" and number of IAM users all domain : "+value_2,HttpStatus.OK);
    }
    @GetMapping(ENDPOINT_22) public ResponseEntity<Void> delete() {
        rus.delete();
        return ResponseEntity.noContent().build();
    }
    @PutMapping(ENDPOINT_23) public ResponseEntity<String> change(@RequestParam Integer id, @RequestParam String password) {
        return new ResponseEntity<>(rus.change(id, password),HttpStatus.ACCEPTED);
    }
    @GetMapping(ENDPOINT_24) public ResponseEntity<forget> details(@RequestParam Integer id) {
        return new ResponseEntity<>(rus.details(id),HttpStatus.OK);
    }
    @PutMapping(ENDPOINT_25) public ResponseEntity<String> inlineChange(@RequestParam Integer id,@RequestParam String old_password, @RequestParam String password) {
        return new ResponseEntity<>(rus.inlineChange(id, old_password, password),HttpStatus.ACCEPTED);
    }
}
