package br.ufg.softwareubiquo.tarefas.security;

import br.ufg.softwareubiquo.tarefas.dtos.AuthRequestDTO;
import br.ufg.softwareubiquo.tarefas.dtos.JwtResponseDTO;
import br.ufg.softwareubiquo.tarefas.models.User;
import br.ufg.softwareubiquo.tarefas.repository.UserRepository;
import br.ufg.softwareubiquo.tarefas.security.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Override
    public JwtResponseDTO signup(User request) {
        var createUser = User.builder()
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .email(request.getEmail())
                .role(request.getRole())
                .build();
        userRepository.save(createUser);
        var jwt = jwtService.generateToken(createUser);
        return JwtResponseDTO.builder().accessToken(jwt).build();
    }

    @Override
    public JwtResponseDTO signin(AuthRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        var jwt = jwtService.generateToken(user);
        return JwtResponseDTO.builder().accessToken(jwt).email(request.getEmail()).role(user.getRole().name()).build();
    }
}
