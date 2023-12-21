package br.ufg.softwareubiquo.tarefas.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.responses.ApiResponse;
import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Tarefas dinamicas",
                version = "0.1",
                description = "Documentação dos endpoints (Swagger)"
        ),
        security = {
                @SecurityRequirement(
                        name = "bearerAuth"
                )
        }
)
@SecurityScheme(
        name = "bearerAuth",
        description = "Autenticação por JWT",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class SwaggerConfig {
    @Bean
    public OperationCustomizer customizeGlobalApiResponse() {
        return (operation, handlerMethod) -> {
            operation.getResponses().addApiResponse("200", new ApiResponse().description("Operação concluída com sucesso."));
//                        operation.getResponses().addApiResponse("400", new ApiResponse().description("Dados estão faltanto ou estão em formato inválido."));
            operation.getResponses().addApiResponse("403", new ApiResponse().description("Usuário não autenticado."));
            return operation;
        };
    }
}
