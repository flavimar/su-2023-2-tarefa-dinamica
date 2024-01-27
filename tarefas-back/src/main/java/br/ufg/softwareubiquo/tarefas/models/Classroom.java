package br.ufg.softwareubiquo.tarefas.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "s_sala")
public class Classroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sala")
    private Long id;
    @Column(name = "nm_sala")
    private String name;
    @Column(name = "ds_nfc")
    private String nfc;
    @Column(name = "ds_sala")
    private String descricao;
}
