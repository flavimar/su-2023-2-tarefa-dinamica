package br.ufg.softwareubiquo.tarefas.controllers;

import br.ufg.softwareubiquo.tarefas.dtos.RedisDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
@RestController
@RequestMapping("/redis")
public class RedisDataController {
    private  final StringRedisTemplate redisTemplate;
    @PostMapping("")
    public String getById(@RequestBody RedisDto key) {
        return new String(redisTemplate.opsForValue().get(key.getKey()).getBytes(), StandardCharsets.UTF_8);
    }
}
