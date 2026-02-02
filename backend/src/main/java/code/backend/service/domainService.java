package code.backend.service;

import code.backend.entity.domain;
import code.backend.repository.domainRepo;
import code.backend.repository.iamUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class domainService {
    @Autowired private domainRepo dr;
    @Autowired private iamUserRepo iamur;
    public String saveDomain(String name,Integer id) {
        String nameValue = name.toLowerCase();
        int count = 0;
        for(int i=0;i<nameValue.length();i++) {
            if(nameValue.charAt(i)>='a' && nameValue.charAt(i)<='z') count++;
        }
        if(count!=nameValue.length()) return "Name field only accepts letters only not even a space";
        if(dr.domain_id(name.toLowerCase())!=null) return "Domain name already exist";
        domain value = new domain();
        value.setDomain_name(name.toLowerCase());
        value.setRootUser_id(id);
        dr.save(value);
        return "Domain created"+" : "+name.toLowerCase();
    }
    public domain find(Integer value) { return dr.findById(value).orElse(null); }
    public String editDomain(Integer id,String name) {
        domain data = find(id);
        String nameValue = name.toLowerCase();
        int count = 0;
        for(int i=0;i<nameValue.length();i++) {
            if(nameValue.charAt(i)>='a' && nameValue.charAt(i)<='z') count++;
        }
        if(count!=nameValue.length()) return "Name field only accepts letters only not even a space";
        if(dr.domain_id(name.toLowerCase())!=null) return "Domain name already exist";
        data.setDomain_name(name.toLowerCase());
        dr.save(data);
        return "Domain edited"+" : "+name.toLowerCase();
    }
    public String deleteDomain(Integer id) {
        String result = "Domain deleted and All IAM Users belong to this domain also deleted"+" : "+find(id).getDomain_name();
        iamur.deleteiamUserDomain(find(id).getDomain_name());
        dr.deleteById(id);
        return result;
    }
    public List<Object> getAllDomain(Integer id, String search) {
        List<domain> value;
        if(search==null) value = dr.findAll(id,null,null,null);
        else value = dr.findAll(id,search,search+"%","%"+search+"%");
        List<Object> result = new ArrayList<>();
        for(int i=0;i<value.size();i++) {
            Object value_1;
            Integer count = iamur.iamUserCount(id,value.get(i).getDomain_name());
            value_1 = value.get(i);
            value_1 += " and IAM User Count : "+count;
            result.add(value_1);
        }
        return result;
    }
    public String find_rootUser(String domain_name,Integer current_user_id) {
        if(dr.find_rootUser(domain_name, current_user_id)!=null) return "Root user";
        return "Not a root user";
    }
    public Integer domainCount(Integer rootUser_id) {
        return dr.domainCount(rootUser_id);
    }
}
