package br.ufg.softwareubiquo.tarefas.service;


import br.ufg.softwareubiquo.tarefas.models.Task;
import br.ufg.softwareubiquo.tarefas.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    public Long save(Task task){
        taskRepository.save(task);
        return task.getId();
    }
    public List<Task> getAll(){
        return taskRepository.findAll();
    }
    public Long edit(Task task,long id){
        getById(id);
        task.setId(id);
        taskRepository.save(task);
        return task.getId();
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
