package br.ufg.softwareubiquo.tarefas.models;

import br.ufg.softwareubiquo.tarefas.enums.TaskType;
import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.NotBlank;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "s_tarefa")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tarefa")
    private Long id;
    @NotBlank
    @Column(name = "nm_tarefa",nullable = false)
    private String name;
    @Column(name = "ds_tarefa")
    private String description;
    @Column(name = "nr_peso")
    private int weigth;
    @NotBlank
    @Column(name = "cs_tipo",nullable = false)
    private TaskType type;

}
