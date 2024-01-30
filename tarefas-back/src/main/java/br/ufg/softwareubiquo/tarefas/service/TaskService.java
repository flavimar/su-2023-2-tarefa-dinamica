package br.ufg.softwareubiquo.tarefas.service;


import br.ufg.softwareubiquo.tarefas.dtos.RespondActivityDto;
import br.ufg.softwareubiquo.tarefas.models.Task;
import br.ufg.softwareubiquo.tarefas.models.User;
import br.ufg.softwareubiquo.tarefas.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    public Long save(Task task, User user){
        task.setUser(user);

        taskRepository.save(task);
        return task.getId();
    }
    public List<Task> getAll(){
        return taskRepository.findAll();
    }
    public List<Task> getAllByClassroom(Long classroomId){
        return taskRepository.findAllByClassroomId(classroomId);
    }
    public Long edit(Task task,long id){
        getById(id);
        task.setId(id);
        taskRepository.save(task);
        return task.getId();
    }
    public Task respondActivity(RespondActivityDto activityDto, long id){
        var task = getById(id);
        task.setActivity(activityDto.getActivity());
        if(activityDto.getActivity() != null && activityDto.getActivity().length() >= 250){
            task.setCompleted(true);
            task.setCompletedDate(Instant.now());
        }
        taskRepository.save(task);
        return task;
    }
    public Task getById(long id){
        return taskRepository.findById(id).orElseThrow();
    }
    public Long deleteById(long id){
        Task task = getById(id);
        taskRepository.deleteById(id);
        return task.getId();
    }
}
