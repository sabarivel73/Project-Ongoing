package code.backend.controller;

import code.backend.entity.iamUser;
import code.backend.service.iamUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static code.backend.constants.APIDictionary.*;

@RestController
@RequestMapping(API+ENDPOINT_3)
public class iamUserController {
    @Autowired private iamUserService iamus;
    @GetMapping public ResponseEntity<List<iamUser>> getAlliamUser(@RequestParam String domain_name,@RequestParam(required = false) String search) {
        return new ResponseEntity<>(iamus.getAlliamUser(domain_name,search), HttpStatus.FOUND);
    }
    @GetMapping("/{id}") public ResponseEntity<iamUser> getiamUser(@PathVariable Integer id) {
        return new ResponseEntity<>(iamus.find(id),HttpStatus.FOUND);
    }
    @GetMapping(ENDPOINT_28) public ResponseEntity<String> check(@RequestParam Integer id) {
        return new ResponseEntity<>(iamus.check(id),HttpStatus.OK);
    }
}
