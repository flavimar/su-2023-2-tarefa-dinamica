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
        var value = redisTemplate.opsForValue().get(key.getKey());
        if(value != null){
            value =  new String(value.getBytes(), StandardCharsets.UTF_8);
        }
        return value;
    }
}
