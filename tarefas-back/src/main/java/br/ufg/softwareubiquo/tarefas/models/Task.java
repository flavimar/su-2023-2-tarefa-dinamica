package br.ufg.softwareubiquo.tarefas.models;

import br.ufg.softwareubiquo.tarefas.enums.TaskType;
import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SourceType;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

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
    @ManyToOne
    @JoinColumn(name = "sala_id")
    private Classroom classroom;
    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private User user;

    @Column(name = "ds_atividade",columnDefinition = "TEXT")
    private String activity;

    @Column(name = "st_completo", columnDefinition = "boolean default false", nullable = false)
    private boolean isCompleted;

    @Column(name = "dh_completo")
    private Instant completedDate;

    @CreationTimestamp(source = SourceType.DB)
    @Column(name = "dh_criado")
    private Instant createdOn;

    @Column(name = "dh_atualizado")
    @UpdateTimestamp(source = SourceType.DB)
    private Instant lastUpdatedOn;

}
