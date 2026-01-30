package code.backend.controller;

import code.backend.entity.*;
import code.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static code.backend.constants.APIDictionary.*;

@RestController
@RequestMapping(API+ENDPOINT_1)
public class rootUserController {
    @Autowired private rootUserService rus;
    @Autowired private domainService ds;
    @PostMapping public ResponseEntity<String> saveUser(@RequestBody rootUser value) {
        return new ResponseEntity<>(rus.saveUser(value), HttpStatus.CREATED);
    }
    @PutMapping public ResponseEntity<Object> editUser(@RequestParam Integer id,@RequestBody rootUser value) {
        return new ResponseEntity<>(rus.editUser(id,value),HttpStatus.ACCEPTED);
    }
    @DeleteMapping public ResponseEntity<String> deleteUser(@RequestParam Integer id) {
        return new ResponseEntity<>(rus.deleteUser(id),HttpStatus.OK);
    }
    @PostMapping(ENDPOINT_2) public ResponseEntity<String> saveDomain(@RequestParam String name, @RequestParam Integer id) {
        return new ResponseEntity<>(ds.saveDomain(name,id), HttpStatus.CREATED);
    }
    @GetMapping public ResponseEntity<List<domain>> getAllDomains(@RequestParam Integer id) {
        return new ResponseEntity<>(ds.getAllDomain(id),HttpStatus.FOUND);
    }
    @GetMapping("/{id}") public ResponseEntity<domain> getDomain(@PathVariable Integer id) {
        return new ResponseEntity<>(ds.find(id), HttpStatus.FOUND);
    }
}
