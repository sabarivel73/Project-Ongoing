package code.backend.controller;

import code.backend.entity.domainAnnouncement;
import code.backend.service.domainAnnouncementService;
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
@RequestMapping(API+ENDPOINT_13)
public class domainAnnouncementController {
    @Autowired private domainAnnouncementService das;
    @PostMapping public ResponseEntity<String> post_announcement(@RequestParam Integer rootUser_id, @RequestParam String domain_name, @RequestParam(required = false) String content, @RequestParam(required = false) MultipartFile attachment) throws IOException {
        return new ResponseEntity<>(das.post_announcement(rootUser_id, domain_name, content, attachment), HttpStatus.CREATED);
    }
    @GetMapping public ResponseEntity<domainAnnouncement> get_announcement(@RequestParam Integer id) {
        return new ResponseEntity<>(das.get_announcement(id),HttpStatus.OK);
    }
    @GetMapping(ENDPOINT_6) public ResponseEntity<byte[]> download_file(@RequestParam String key) throws IOException {
        byte[] value = das.download_file(key);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentDispositionFormData("file",key);
        return new ResponseEntity<>(value,httpHeaders,HttpStatus.OK);
    }
    @GetMapping(ENDPOINT_14) public ResponseEntity<List<domainAnnouncement>> get_allAnnouncement(@RequestParam String domain_name) {
        return new ResponseEntity<>(das.get_allAnnouncement(domain_name),HttpStatus.OK);
    }
    @PutMapping public ResponseEntity<String> edit_announcement(@RequestParam Integer id,@RequestParam(required = false) String content,@RequestParam(required = false) MultipartFile attachment) throws IOException {
        return new ResponseEntity<>(das.edit_announcement(id, content, attachment),HttpStatus.OK);
    }
    @DeleteMapping public ResponseEntity<String> delete_announcement(@RequestParam Integer id) throws IOException {
        return new ResponseEntity<>(das.delete_announcement(id),HttpStatus.OK);
    }
}
