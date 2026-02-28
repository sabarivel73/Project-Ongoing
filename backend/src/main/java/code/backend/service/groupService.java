package code.backend.service;

import code.backend.entity.group;
import code.backend.repository.groupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class groupService {
    @Autowired private groupRepo gr;
    @Autowired private groupMessageService gms;
    public String create_group(Integer createdBy, String group_name,String domain_name) {
        group value = new group();
        value.setCreatedBy(createdBy);
        value.setGroup_name(group_name);
        value.setDomain_name(domain_name);
        List<Integer> values = new ArrayList<>();
        values.add(createdBy);
        value.setSubscribers(values);
        gr.save(value);
        return "Group created";
    }
    public String add_subscriber(Integer group_id,Integer subscriber_id) {
        group value = gr.findById(group_id).orElse(null);
        if(value==null) return "Group not found";
        List<Integer> values = value.getSubscribers();
        values.add(subscriber_id);
        value.setSubscribers(values);
        gr.save(value);
        return "Subscriber successfully added";
    }
    public String delete_group(Integer id) {
        gms.delete_allMessage(id);
        gr.delete_group(id);
        return "Group deleted";
    }
    public String find_createdBy(Integer id,Integer current_user_id) {
        if(gr.find_createdBy(id, current_user_id)!=null) return "Created by this user";
        return "Not created by this user";
    }
    public List<group> subscriber_group(Integer iamUser_id,String domain_name) {
        return gr.subscriber_group(iamUser_id,domain_name);
    }
    public String leave_group(Integer group_id,Integer subscriber_id) {
        group value = gr.findById(group_id).orElse(null);
        if (value==null) return "No group found";
        List<Integer> values = value.getSubscribers();
        int index = 0;
        for(int i=0;i<values.size();i++) {
            if(values.get(i).equals(subscriber_id)) {
                index = i;
                break;
            }
        }
        values.remove(index);
        value.setSubscribers(values);
        gr.save(value);
        return "Successfully leaved from the group";
    }
}
