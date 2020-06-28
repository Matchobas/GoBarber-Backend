  # Recuperação de senha

  **Req Funcionais**

  - O usuário deve poder recuperar sua senha informando o seu email
  - O usuário deve receber email com instruções de recuperação de senha
  - O usuário deve poder resetar sua senha

  **Req Não Funcionais**

  - Utilizar Mailtrap para testar envios em ambiente de dev (Mailtrap é um serviço que permite que você envie emails falsos e eles caem todos na "trap")
  - Utilizar Amazon SES para envios em produção
  - O envio de emails deve acontecer em segundo plano (background job)

  **Regras de Negócio**

  - O link enviado por email para resetar senha deve inspirar em 2 horas
  - O usuário precisa confirmar a nova senha ao resetar sua senha

  # Atualização do perfil

  **Req Funcionais**

  - O usuário deve poder atualizar seu nome, email e senha

  **Regras de Negócio**

  - O usuário não pode alterar seu email para um email já utilizado
  - Para atualizar sua senha, o usuário deve informar a senha antiga
  - Para atualizar sua senha, o usuário precisar confirmar a nova senha

  # Painel do prestador

  **Req Funcionais**

  - O usuário deve poder listar seus agendamentos de um dia específico
  - O prestador deve receber uma notificação sempre que houver um novo agendamento
  - O prestador deve poder visualizar as notificações não lidas

  **Req Não Funcionais**

  - Os agendamentos do prestador do dia devem ser armazenados em cache
  - As notificações do prestador devem ser armazenadas no MongoDB
  - As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io

  **Regras de Negócio**

  - A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar

  # Agendamento de serviços

  **Req Funcionais**

  - O usuário deve poder listar todos os prestadores de serviço cadastrados
  - O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador
  - O usuário deve poder listar horários disponíveis em um dia específico de um prestador
  - O usuário deve poder realizar um novo agendamento com um prestador

  **Req Não Funcionais**

  - A listagem de prestadores deve ser armazenada em cache

  **Regras de Negócio**

  - Todo agendamento vai durar 1h exatamente
  - Os agendamentos devem estar disponíveis entre 8h da manhã às 18h (Primeiro horário as 8h, último as 17h)
  - O usuário não pode agendar em um horário já ocupado
  - O usuário não pode agendar em um horário que já passou
  - O usuário não pode agendar serviços consigo mesmo
