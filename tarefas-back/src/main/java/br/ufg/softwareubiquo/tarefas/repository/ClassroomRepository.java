package br.ufg.softwareubiquo.tarefas.repository;

import br.ufg.softwareubiquo.tarefas.models.Classroom;
import br.ufg.softwareubiquo.tarefas.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassroomRepository extends JpaRepository<Classroom,Long> {
}
