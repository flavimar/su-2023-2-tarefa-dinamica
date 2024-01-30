package br.ufg.softwareubiquo.tarefas.repository;

import br.ufg.softwareubiquo.tarefas.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {
    List<Task> findAll();
    List<Task> findAllByClassroomId(long classroomId);
    Optional<Task> getById(long id);
}
