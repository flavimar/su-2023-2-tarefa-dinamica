# su-2023-2-tarefa-dinamica
## Participantes
Nome | Matricula
----- | -------
Flavimar da Silva Almeida | 201905529
Giancarlo Oliveira | 201905531

## Descrição da aplicação
A aplicação consiste na distribuição dinâmica de tarefas para pessoas no contexto de uma smart space
## Funcionalidades
* Distribuição de tarefa
* Criação de tarefa
* Finalização de tarefa
* Visualização de tarefas
* Mover tarefa
* Copiar tarefa
* Fazer artefato da tarefa

## Padrão Arquitetural
O padrão arquitetura escolhido foi publisher/subscriber para fazer a troca de informações entres os subsistemas, sendo eles componetes web e mobile
## Arquitetura
* java com spring boot para o cliente web
* android para o mobile
* node-red para a lógica tráfico de mensagem
* mosquitto para o recebimento e envio de mensagens

