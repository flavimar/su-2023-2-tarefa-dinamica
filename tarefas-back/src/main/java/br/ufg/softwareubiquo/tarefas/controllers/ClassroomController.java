package br.ufg.softwareubiquo.tarefas.controllers;

import br.ufg.softwareubiquo.tarefas.models.Classroom;
import br.ufg.softwareubiquo.tarefas.models.Task;
import br.ufg.softwareubiquo.tarefas.service.ClassroomService;
import br.ufg.softwareubiquo.tarefas.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/classrooms")
public class ClassroomController {
    private final ClassroomService classroomService;
    private final TaskService taskService;
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("")
    public Long save(@RequestBody Classroom classroom) {
        return classroomService.save(classroom);
    }
    @GetMapping("")
    public List<Classroom> getAll() {
        return classroomService.getAll();
    }
    @PutMapping("/{id}")
    public Long edit(@PathVariable long id,@RequestBody Classroom classroom) {
        return classroomService.edit(classroom,id);
    }
    @GetMapping("/{id}/tasks")
    public List<Task> getAllByClassroom(@PathVariable long id) {
        return taskService.getAllByClassroom(id);
    }
    @GetMapping("/{id}")
    public Classroom getById(@PathVariable long id) {
        return classroomService.getById(id);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public Long deleteById(@PathVariable long id) {
        return classroomService.deleteById(id);
    }

}
