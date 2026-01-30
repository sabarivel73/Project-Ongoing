package code.backend.service;

import code.backend.entity.rootUser;
import code.backend.repository.domainRepo;
import code.backend.repository.rootUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class rootUserService {
    @Autowired private rootUserRepo rur;
    @Autowired private domainRepo dr;
    @Autowired private domainService ds;
    public String saveUser(rootUser value) {
        if(rur.rootUserID(value.getName().toLowerCase())!=null) return "User name already exist";
        value.setName(value.getName().toLowerCase());
        value.setEmail(value.getEmail().toLowerCase());
        rur.save(value);
        return "User saved";
    }
    public rootUser find(Integer value) { return rur.findById(value).orElse(null); }
    public Object editUser(Integer id,rootUser value) {
        rootUser data = find(id);
        if(rur.rootUserID(value.getName().toLowerCase())!=null) return "User name already exist";
        data.setName(value.getName().toLowerCase());
        data.setPassword(value.getPassword());
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
        String value = rur.login(user_name.toLowerCase());
        if(value==null) return "No User name found";
        if(!value.equals(password)) return "Password was wrong";
        return "User logged in successfully";
    }
}
