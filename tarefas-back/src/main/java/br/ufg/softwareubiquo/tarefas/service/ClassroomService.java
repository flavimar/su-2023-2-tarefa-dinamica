package br.ufg.softwareubiquo.tarefas.service;

import br.ufg.softwareubiquo.tarefas.models.Classroom;
import br.ufg.softwareubiquo.tarefas.models.Task;
import br.ufg.softwareubiquo.tarefas.repository.ClassroomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClassroomService {
    private final ClassroomRepository classroomRepository;
    public Long save(Classroom classroom){
        classroomRepository.save(classroom);
        return classroom.getId();
    }
    public List<Classroom> getAll(){
        return classroomRepository.findAll();
    }
    public Long edit(Classroom classroom,long id){
        getById(id);
        classroom.setId(id);
        classroomRepository.save(classroom);
        return classroom.getId();
    }
    public Classroom getById(long id){
        return classroomRepository.findById(id).orElseThrow();
    }
    public Long deleteById(long id){
        Classroom classroom = getById(id);
        classroomRepository.deleteById(id);
        return classroom.getId();
    }

}
