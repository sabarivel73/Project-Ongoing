package code.backend.service;

import code.backend.entity.iamUser;
import code.backend.repository.iamUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class iamUserService {
    @Autowired private iamUserRepo iamur;
    @Autowired private PasswordEncoder passwordEncoder;
    public String saveiamUser(iamUser value, Integer id,String domain_name) {
        String name = value.getName().toLowerCase();
        int count = 0;
        for(int i=0;i<name.length();i++) {
            if(name.charAt(i)>='a' && name.charAt(i)<='z') count++;
        }
        if(count!=name.length()) return "Name field only accepts letters only not even a space";
        if(iamur.iamUserID(value.getName().toLowerCase(),domain_name)!=null) return "IAM User name already exist in this domain";
        if(value.getPassword().length()>16 || value.getPassword().length()<8) return "Password size min = 8 and max = 16";
        String password = passwordEncoder.encode(value.getPassword());
        value.setRootUser_id(id);
        value.setDomain_name(domain_name.toLowerCase());
        value.setName(value.getName().toLowerCase());
        value.setPassword(password);
        iamur.save(value);
        return "IAM user created under this domain - "+value.getDomain_name();
    }
    public iamUser find(Integer id) { return iamur.findById(id).orElse(null); }
    public String editiamUser(Integer id, String role, String password) {
        iamUser value = iamur.findById(id).orElse(null);
        if(value==null) return "No IAM user found";
        if(role!=null) {
            value.setRole(role);
        }
        if(password!=null) {
            value.setPassword(passwordEncoder.encode(password));
        }
        iamur.save(value);
        return "IAM user edit successfully";
    }
    public String deleteiamUser(Integer id) {
        iamUser value = find(id);
        iamur.deleteById(id);
        return "IAM user deleted";
    }
    public List<iamUser> getAlliamUser(String domain_name,String search) {
        if(search==null) return iamur.findAll(domain_name.toLowerCase(),null,null,null);
        return iamur.findAll(domain_name.toLowerCase(),search,"%"+search.toLowerCase(),"%"+search.toLowerCase()+"%");
    }
    public String loginiamUser(String domain_name,String user_name,String password) {
        iamUser value = iamur.login(domain_name.toLowerCase(),user_name.toLowerCase());
        if(value==null) return "Domain name or User name was not found";
        if(!passwordEncoder.matches(password, value.getPassword())) return "Password was wrong";
        return "IAM User logged in successfully and iamUser ID : "+value.getId();
    }
    public Integer iamUserCount(Integer rootUser_id,String domain_name) {
        return iamur.iamUserCount(rootUser_id,domain_name);
    }
}
