package br.ufg.softwareubiquo.tarefas.controllers;

import br.ufg.softwareubiquo.tarefas.dtos.AuthRequestDTO;
import br.ufg.softwareubiquo.tarefas.dtos.JwtResponseDTO;
import br.ufg.softwareubiquo.tarefas.models.User;
import br.ufg.softwareubiquo.tarefas.repository.UserRepository;

import br.ufg.softwareubiquo.tarefas.security.AuthenticationServiceImpl;

import lombok.Data;



import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;
@Data
@RestController
public class UserController {
    private final UserRepository userRepository;
    private final AuthenticationServiceImpl authenticate;
    @PostMapping("/login")
    public JwtResponseDTO signin(@RequestBody AuthRequestDTO requisicao) {
        return authenticate.signin(requisicao);
    }
    @PostMapping("/signup")
    public JwtResponseDTO signup(@RequestBody User user){
        return authenticate.signup(user);
    }

}
