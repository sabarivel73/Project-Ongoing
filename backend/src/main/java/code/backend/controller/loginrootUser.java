package code.backend.controller;

import code.backend.service.rootUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static code.backend.constants.APIDictionary.*;

@RestController
@RequestMapping(API+ENDPOINT_4)
public class loginrootUser {
    @Autowired private rootUserService rus;
    @GetMapping(ENDPOINT_1) public ResponseEntity<String> loginrootUser(@RequestParam(required = false) String user_name, @RequestParam(required = false) String email, @RequestParam String password) {
        return new ResponseEntity<>(rus.loginrootUser(user_name,email,password), HttpStatus.OK);
    }
}
