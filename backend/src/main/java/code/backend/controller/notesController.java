package code.backend.controller;

import code.backend.entity.notes;
import code.backend.service.notesService;
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
@RequestMapping(API+ENDPOINT_15)
public class notesController {
    @Autowired private notesService ns;
    @PostMapping public ResponseEntity<String> send_note(@RequestParam Integer iamUser_id, @RequestParam(required = false) String content, @RequestParam(required = false) MultipartFile attachment) throws IOException {
        return new ResponseEntity<>(ns.send_note(iamUser_id, content, attachment), HttpStatus.CREATED);
    }
    @GetMapping public ResponseEntity<List<notes>> get_notes(@RequestParam Integer iamUser_id) {
        return new ResponseEntity<>(ns.get_notes(iamUser_id),HttpStatus.OK);
    }
    @GetMapping(ENDPOINT_6) public ResponseEntity<byte[]> download_file(@RequestParam String key) throws IOException {
        byte[] value = ns.download_file(key);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        httpHeaders.setContentDispositionFormData("file",key);
        return new ResponseEntity<>(value,httpHeaders,HttpStatus.OK);
    }
    @PutMapping public ResponseEntity<String> edit_note(@RequestParam Integer id,@RequestParam(required = false) String content) {
        return new ResponseEntity<>(ns.edit_note(id, content),HttpStatus.OK);
    }
    @DeleteMapping public ResponseEntity<String> delete_note(@RequestParam Integer id) throws IOException {
        return new ResponseEntity<>(ns.delete_note(id),HttpStatus.OK);
    }
}
