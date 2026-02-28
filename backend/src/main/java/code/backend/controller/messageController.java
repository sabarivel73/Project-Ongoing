package code.backend.controller;

import code.backend.entity.displayChat;
import code.backend.entity.message;
import code.backend.service.messageService;
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
@RequestMapping(API+ENDPOINT_5)
public class messageController {
    @Autowired private messageService ms;
    @PostMapping public ResponseEntity<Object> send_message(@RequestParam Integer sender_id, @RequestParam Integer receiver_id, @RequestParam(required = false) String content, @RequestParam(required = false) MultipartFile attachment) throws IOException {
        return new ResponseEntity<>(ms.send_message(sender_id, receiver_id, content, attachment), HttpStatus.CREATED);
    }
    @GetMapping public ResponseEntity<List<message>> get_messages(@RequestParam Integer sender_id,@RequestParam Integer receiver_id) {
        return new ResponseEntity<>(ms.get_messages(sender_id,receiver_id),HttpStatus.OK);
    }
    @GetMapping(ENDPOINT_6) public ResponseEntity<byte[]> download_file(@RequestParam String key) throws IOException {
        byte[] value = ms.download_file(key);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentDispositionFormData("file",key);
        return new ResponseEntity<>(value,httpHeaders,HttpStatus.OK);
    }
    @PutMapping public ResponseEntity<String> edit_message(@RequestParam Integer id,@RequestParam(required = false) String content) {
        return new ResponseEntity<>(ms.edit_message(id, content),HttpStatus.OK);
    }
    @DeleteMapping public ResponseEntity<String> delete_message(@RequestParam Integer id) throws IOException {
        return new ResponseEntity<>(ms.delete_message(id),HttpStatus.OK);
    }
    @GetMapping(ENDPOINT_10) public ResponseEntity<String> find_sender(@RequestParam Integer id, @RequestParam Integer current_user_id) {
        return new ResponseEntity<>(ms.find_sender(id, current_user_id),HttpStatus.OK);
    }
    @GetMapping(ENDPOINT_27) public ResponseEntity<List<displayChat>> chat(@RequestParam Integer id) {
        return new ResponseEntity<>(ms.chat(id),HttpStatus.OK);
    }
}
