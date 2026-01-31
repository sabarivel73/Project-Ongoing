package code.backend.controller;

import code.backend.entity.groupMessageResponse;
import code.backend.service.groupMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static code.backend.constants.APIDictionary.*;

@RestController
@RequestMapping(API+ENDPOINT_9)
public class groupMessageController {
    @Autowired private groupMessageService gms;
    @PostMapping public ResponseEntity<Object> send_message(@RequestParam Integer group_id,@RequestParam Integer sender_id,@RequestParam String domain_name, @RequestParam(required = false) String content, @RequestParam(required = false) MultipartFile attachment) throws IOException {
        return new ResponseEntity<>(gms.send_message(group_id, sender_id, domain_name, content, attachment), HttpStatus.CREATED);
    }
    @GetMapping public ResponseEntity<List<groupMessageResponse>> get_message(@RequestParam Integer group_id, @RequestParam String domain_name) {
        return new ResponseEntity<>(gms.get_message(group_id,domain_name),HttpStatus.OK);
    }
    @GetMapping(ENDPOINT_6) public ResponseEntity<byte[]> download_file(@RequestParam String key) throws IOException {
        byte[] value = gms.download_file(key);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentDispositionFormData("file",key);
        return new ResponseEntity<>(value,httpHeaders,HttpStatus.OK);
    }
    @DeleteMapping public ResponseEntity<String> delete_message(@RequestParam Integer id) {
        return new ResponseEntity<>(gms.delete_message(id),HttpStatus.OK);
    }
    @GetMapping(ENDPOINT_10) public ResponseEntity<String> find_sender(@RequestParam Integer id, @RequestParam Integer current_user_id) {
        return new ResponseEntity<>(gms.find_sender(id,current_user_id),HttpStatus.OK);
    }
}