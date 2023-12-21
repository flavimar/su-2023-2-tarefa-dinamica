package br.ufg.softwareubiquo.tarefas.controllers;

import br.ufg.softwareubiquo.tarefas.dtos.AuthRequestDTO;
import br.ufg.softwareubiquo.tarefas.dtos.JwtResponseDTO;
import br.ufg.softwareubiquo.tarefas.enums.UserRole;
import br.ufg.softwareubiquo.tarefas.models.Task;
import br.ufg.softwareubiquo.tarefas.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/task")
public class TaskController {
    private final TaskService taskService;
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("")
    public Long save(@RequestBody Task task) {
        return taskService.save(task);
    }
    @GetMapping("")
    public List<Task> getAll() {
        return taskService.getAll();
    }
    @PutMapping("/{id}")
    public Long edit(@PathVariable long id,@RequestBody Task task) {
        return taskService.edit(task,id);
    }
    @GetMapping("/{id}")
    public Task getById(@PathVariable long id) {
        return taskService.getById(id);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public Long deleteById(@PathVariable long id) {
        return taskService.deleteById(id);
    }
}
