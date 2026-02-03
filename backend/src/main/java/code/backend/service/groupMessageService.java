package code.backend.service;

import code.backend.entity.groupMessage;
import code.backend.entity.groupMessageResponse;
import code.backend.repository.groupMessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class groupMessageService {
    @Value("${spring.aws.bucket_name}") private String bucket_name;
    @Autowired private groupMessageRepo gmr;
    @Autowired private S3Client s3Client;
    public Object send_message(Integer group_id, Integer sender_id, String domain_name, String content, MultipartFile attachment) throws IOException {
        groupMessage value = new groupMessage();
        value.setGroupId(group_id);
        value.setSenderId(sender_id);
        value.setContent(content);
        value.setDomain_name(domain_name);
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
        return gmr.save(value);
    }
    public List<groupMessageResponse> get_message(Integer group_id, String domain_name) {
        return gmr.get_message(group_id,domain_name);
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
    public String edit_message(Integer id, String content) {
        groupMessage value = gmr.findById(id).orElse(null);
        if(value==null) return "Message not found";
        if(content!=null && !value.getContent().equals(content)) {
            value.setContent(content);
            gmr.save(value);
            return "Message edited successfully";
        }
        return "No changes found";
    }
    public String delete_message(Integer id) throws IOException {
        groupMessage value = gmr.findById(id).orElse(null);
        if(value==null) return "Message not found";
        if(value.getAttachmentKey()!=null) {
            DeleteObjectRequest file = DeleteObjectRequest.builder()
                    .bucket(bucket_name)
                    .key(value.getAttachmentKey())
                    .build();
            s3Client.deleteObject(file);
        }
        gmr.delete_message(id);
        return "Message deleted";
    }
    public String find_sender(Integer id,Integer current_user_id) {
        if(gmr.find_sender(id, current_user_id)!=null) return "Sender";
        return "Not sender";
    }
    public void delete_allMessage(Integer group_id) {
         gmr.delete_allMessage(group_id);
    }
}
