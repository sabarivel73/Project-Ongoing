package code.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class S3Config {
    @Value("${spring.aws.access_key}") private String access_key;
    @Value("${spring.aws.secret_key}") private String secret_key;
    @Value("${spring.aws.region}") private String region;

    @Bean public S3Client s3Client() {
        AwsBasicCredentials credentials = AwsBasicCredentials.create(access_key,secret_key);
        return S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(credentials))
                .build();
    }
}