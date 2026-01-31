package code.backend.service;

import code.backend.entity.domainAnnouncement;
import code.backend.repository.domainAnnouncementRepo;
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
public class domainAnnouncementService {
    @Value("${spring.aws.bucket_name}") private String bucket_name;
    @Autowired private domainAnnouncementRepo dar;
    @Autowired private S3Client s3Client;
    public String post_announcement(Integer rootUser_id, String domain_name, String content, MultipartFile attachment) throws IOException {
        domainAnnouncement value = new domainAnnouncement();
        value.setRootUser_id(rootUser_id);
        value.setDomain_name(domain_name);
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
        dar.save(value);
        return "Announcement posted successfully";
    }
    public domainAnnouncement get_announcement(Integer id) {
        return dar.findById(id).orElse(null);
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
    public List<domainAnnouncement> get_allAnnouncement(String domain_name) {
        return dar.get_allAnnouncement(domain_name);
    }
    public String delete_announcement(Integer id) {
        dar.deleteById(id);
        return "Announcement deleted successfully";
    }
}
