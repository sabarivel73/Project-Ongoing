package code.backend.service;

import code.backend.entity.rootUser;
import code.backend.entity.validation;
import code.backend.repository.domainRepo;
import code.backend.repository.rootUserRepo;
import code.backend.repository.validationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class rootUserService {
    @Value("${spring.mail.username}") private String sender;
    @Autowired private rootUserRepo rur;
    @Autowired private domainRepo dr;
    @Autowired private domainService ds;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JavaMailSender javaMailSender;
    @Autowired private validationRepo vr;
    public String saveUser(rootUser value) {
        String name = value.getName().toLowerCase();
        int count = 0;
        for(int i=0;i<name.length();i++) {
            if(name.charAt(i)>='a' && name.charAt(i)<='z') count++;
        }
        if(count!=name.length()) return "Name field only accepts letters only not even a space";
        if(rur.rootUserID(value.getName().toLowerCase())!=null) return "User name already exist";
        if(value.getPassword().length()>16 || value.getPassword().length()<8) return "Password size min = 8 and max = 16";
        String password = passwordEncoder.encode(value.getPassword());
        value.setName(value.getName().toLowerCase());
        String mail = "";
        boolean check = false;
        for(int i=0;i<value.getEmail().length();i++) {
            if(value.getEmail().charAt(i)=='@') check = true;
            if(check) mail += value.getEmail().charAt(i);
        }
        if(!mail.equals("@gmail.com")) return "For now we only allow email end up with @gmail.com address";
        value.setEmail(value.getEmail().toLowerCase());
        value.setPassword(password);
        rur.save(value);
        return "User saved";
    }
    public rootUser find(Integer value) { return rur.findById(value).orElse(null); }
    public Object editUser(Integer id,rootUser value) {
        rootUser data = find(id);
        String name = value.getName().toLowerCase();
        int count = 0;
        for(int i=0;i<name.length();i++) {
            if(name.charAt(i)>='a' && name.charAt(i)<='z') count++;
        }
        if(count!=name.length()) return "Name field only accepts letters only not even a space";
        if(rur.rootUserID(value.getName().toLowerCase())!=null) return "User name already exist";
        if(value.getPassword().length()>16 || value.getPassword().length()<8) return "Password size min = 8 and max = 16";
        String password = passwordEncoder.encode(value.getPassword());
        data.setName(value.getName().toLowerCase());
        data.setPassword(password);
        String mail = "";
        boolean check = false;
        for(int i=0;i<value.getEmail().length();i++) {
            if(value.getEmail().charAt(i)=='@') check = true;
            if(check) mail += value.getEmail().charAt(i);
        }
        if(!mail.equals("@gmail.com")) return "For now we only allow email end up with @gmail.com address";
        data.setEmail(value.getEmail().toLowerCase());
        rur.save(data);
        return data;
    }
    public String deleteUser(Integer id){
        List<Integer> value = dr.idsrootUserDomain(id);
        for(int i=0;i<value.size();i++) {
            ds.deleteDomain(value.get(i));
        }
        rur.deleteById(id);
        return "User deleted and also All Domain are deleted belong to this User";
    }
    public String loginrootUser(String user_name,String password) {
        vr.delete_validation();
        String value = rur.login(user_name.toLowerCase());
        if(value==null) return "No User name found";
        if(!passwordEncoder.matches(password,value)) return "Password was wrong";
        return "User logged in successfully";
    }
    public Object sendMail(String mail) throws IOException {
        String mailValue = "";
        boolean check = false;
        for(int i=0;i<mail.length();i++) {
            if(mail.charAt(i)=='@') check = true;
            if(check) mailValue += mail.charAt(i);
        }
        if(!mailValue.equals("@gmail.com")) return "For now we only allow email end up with @gmail.com address";
        String email = rur.email(mail);
        if(email==null) return "Email not found";
        Integer value = (int)(Math.random()*9000)+1000;
        validation data = new validation();
        data.setValue(value);
        data.setTimestamp(LocalDateTime.now());
        Integer id = vr.save(data).getId();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(sender);
        message.setTo(mail);
        message.setSubject("OTP Mail from OfficeWing");
        message.setText("Vanakam \n\n Your OTP is "+value+"\n\n Thanks for choosing OfficeWing, have a great day");
        javaMailSender.send(message);
        return "Mail sent successfully and " + "Id : "+id;
    }
    public String validation(Integer id, Integer value) {
        vr.delete_validation();
        validation data = vr.findById(id).orElse(null);
        if(data==null) return "OTP expired try again";
        String result;
        if(!value.equals(data.getValue())) result =  "OTP was wrong";
        else result = "OTP verified successfully";
        return result;
    }
}
