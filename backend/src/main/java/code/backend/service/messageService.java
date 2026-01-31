package code.backend.service;

import code.backend.entity.groupMessage;
import code.backend.entity.message;
import code.backend.repository.messageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class messageService {
    @Value("${spring.aws.bucket_name}") private String bucket_name;
    @Autowired private messageRepo mr;
    @Autowired private S3Client s3Client;
    public Object send_message(Integer sender_id, Integer receiver_id, String content, MultipartFile attachment) throws IOException {
        message value = new message();
        value.setSender_id(sender_id);
        value.setReceiver_id(receiver_id);
        value.setContent(content);
        value.setTimestamp(LocalDateTime.now());
        if(attachment != null && !attachment.isEmpty()) {
            if(attachment.getSize()>50*1024*1024) return "File size limit exceeded";
            String key = UUID.randomUUID() + "_" + attachment.getOriginalFilename();
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucket_name)
                    .key(key)
                    .contentType(attachment.getContentType())
                    .build();
            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(attachment.getInputStream(),attachment.getSize()));
            String fileUrl = "https://" + bucket_name + ".s3." + s3Client.serviceClientConfiguration().region().id() + ".amazonaws.com/" + key;
            value.setAttachmentKey(key);
            value.setAttachmentUrl(fileUrl);
            value.setAttachmentType(attachment.getContentType());
        }
        return mr.save(value);
    }
    public List<message> get_messages(Integer sender_id,Integer receiver_id) {
        return mr.get_messages(sender_id,receiver_id);
    }
    public byte[] download_file(String key) throws IOException {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucket_name)
                .key(key)
                .build();
        try (ResponseInputStream<GetObjectResponse> s3Object = s3Client.getObject(getObjectRequest)) {
            return s3Object.readAllBytes();
        }
    }
    public String delete_message(Integer id) {
        mr.delete_message(id);
        return "Message deleted";
    }
    public String find_sender(Integer id,Integer current_user_id) {
        if(mr.find_sender(id, current_user_id)!=null) return "Sender";
        return "Not sender";
    }
}