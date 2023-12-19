package br.ufg.softwareubiquo.tarefas.security;

import br.ufg.softwareubiquo.tarefas.dtos.AuthRequestDTO;
import br.ufg.softwareubiquo.tarefas.dtos.JwtResponseDTO;
import br.ufg.softwareubiquo.tarefas.models.User;

public interface AuthenticationService {
    JwtResponseDTO signup(User request);

    JwtResponseDTO signin(AuthRequestDTO request);
}
