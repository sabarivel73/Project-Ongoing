package code.backend.service;

import code.backend.entity.iamUser;
import code.backend.repository.iamUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class iamUserService {
    @Autowired private iamUserRepo iamur;
    public String saveiamUser(iamUser value, Integer id,String domain_name) {
        if(iamur.iamUserID(value.getName().toLowerCase(),domain_name)!=null) return "IAM User name already exist in this domain";
        value.setRootUser_id(id);
        value.setDomain_name(domain_name.toLowerCase());
        value.setName(value.getName().toLowerCase());
        iamur.save(value);
        return "IAM user created under this domain - "+value.getDomain_name()+","+"name - "+value.getName()+","+"password - "+value.getPassword();
    }
    public iamUser find(Integer id) { return iamur.findById(id).orElse(null); }
    public String editiamUser(iamUser value,Integer id) {
        String result = "";
        iamUser data = find(id);
        if(!data.getName().equals(value.getName().toLowerCase())) {
            if(iamur.iamUserID(value.getName().toLowerCase(),data.getDomain_name())!=null) return "IAM User name already exist in this domain";
            data.setName(value.getName().toLowerCase());
            result += "Name - "+value.getName().toLowerCase()+" ";
        }
        if(!data.getPassword().equals(value.getPassword())) {
            data.setPassword(value.getPassword());
            result += "Password - "+value.getPassword()+" ";
        }
        iamur.save(data);
        result += "successfully edited";
        return result;
    }
    public String deleteiamUser(Integer id) {
        iamUser value = find(id);
        String result = "IAM user name - "+value.getName()+" under "+value.getDomain_name()+" this domain was deleted";
        iamur.deleteById(id);
        return result;
    }
    public List<iamUser> getAlliamUser(String domain_name,String search) {
        if(search==null) return iamur.findAll(domain_name.toLowerCase(),search,search,search);
        return iamur.findAll(domain_name.toLowerCase(),search.toLowerCase(),"%"+search.toLowerCase(),"%"+search.toLowerCase()+"%");
    }
    public String loginiamUser(String domain_name,String user_name,String password) {
        iamUser value = iamur.login(domain_name.toLowerCase(),user_name.toLowerCase());
        if(value==null) return "Domain name or User name was not found";
        if(!value.getPassword().equals(password)) return "Password was wrong";
        return "IAM User logged in successfully";
    }
}
