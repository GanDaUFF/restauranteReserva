Documentação do Projeto — Sistema de Gerenciamento de Reservas de Restaurante
=============================================================================

Sistema para gerenciamento de reservas de mesas em restaurante, permitindo que 
clientes agendem horários e funcionários acompanhem o status das mesas em tempo real.


Funcionalidades Principais
--------------------------
- Cadastro de usuários (gerente, funcionário e cliente)
- Listagem e gerenciamento de mesas
- Criação e atualização de reservas
- Alerta em tempo real de reserva prestes a acontecer
- Atualização automática de status das mesas via job agendado


Equipe
------
Nome Completo           | Matrícula
------------------------|-----------
Henrique Cedraz         | 1272228307
Matheus Moitinho      | 12724113964
Arthur Guilherme Moraes Fonseca de Jesus  | 12724134884 
Marcos Vinícius Santos de Almeida Filho | 12724157479




Requisitos de Software
----------------------
Linguagens e Ambiente:
- Node.js (v18 ou superior)
- TypeScript (v5.x)
- React.js (Next.js 13+ com App Router)
- SQLite (banco de dados local)
- Express.js (backend)

Bibliotecas utilizadas:

Dependencias: Ter o node.js (v18 ou superior) instalado na maquina e ter permissões para rodar scripts npm na maquina

Backend:
- express
- prisma
- sqlite3
- cors
- dotenv
- socket.io
- node-cron

Frontend:
- next
- shadcn/ui
- lucide-react
- axios
- socket.io-client
- sonner
- clsx
- tailwindcss

Instalação e Execução
---------------------
1. Clonar o repositório:
   git clone https://github.com/GanDaUFF/restauranteReserva
   
   cd restauranteReserva

3. Instalar dependências:
   - Backend: cd backend && npm install
   - voltar para a raiz: cd ..
   - Frontend: cd frontend && npm install

4. Configurar variáveis de ambiente:
   Criar um arquivo .env em backend/ com:
   
   DATABASE_URL="file:./dev.db"
  

6. Executar as migrations:
  - npx prisma generate 
  - npx prisma migrate dev --name init 

6. Iniciar os servidores:
   - Backend: npm run dev
   - Frontend: npm run dev

Justificativa da Comunicação Utilizada
--------------------------------------
REST HTTP:
- Utilizado para criação, listagem e edição de reservas, mesas e usuários.
- Método simples e consolidado para interações pontuais.

WebSocket (socket.io):
- Utilizado para alertar o frontend em tempo real quando uma reserva se aproxima.
- Evita polling constante, reduz o tráfego de rede.
- Garante sincronização entre dispositivos para status de mesas.

Job com Node-Cron:
- Roda a cada minuto e verifica se há reservas próximas do horário marcado.
- Atualiza automaticamente o status da mesa.
- Emite evento via socket para atualizar o frontend.
