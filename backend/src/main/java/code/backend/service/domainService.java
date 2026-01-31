package code.backend.service;

import code.backend.entity.domain;
import code.backend.repository.domainRepo;
import code.backend.repository.iamUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class domainService {
    @Autowired private domainRepo dr;
    @Autowired private iamUserRepo iamur;
    public String saveDomain(String name,Integer id) {
        if(dr.domain_id(name.toLowerCase(),id)!=null) return "Domain name already exist";
        domain value = new domain();
        value.setDomain_name(name.toLowerCase());
        value.setRootUser_id(id);
        dr.save(value);
        return "Domain created"+" : "+name.toLowerCase();
    }
    public domain find(Integer value) { return dr.findById(value).orElse(null); }
    public String editDomain(Integer id,String name) {
        domain data = find(id);
        if(dr.domain_id(name.toLowerCase(),data.getRootUser_id())!=null) return "Domain name already exist";
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
    public List<domain> getAllDomain(Integer id) {
        return dr.findAll(id);
    }
    public String find_rootUser(String domain_name,Integer current_user_id) {
        if(dr.find_rootUser(domain_name, current_user_id)!=null) return "Root user";
        return "Not a root user";
    }
}
