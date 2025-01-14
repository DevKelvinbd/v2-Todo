# Todo List com Gameficação 🚀

Este projeto foi desenvolvido como parte de um **case técnico** solicitado pela empresa **V360**, utilizando as tecnologias **Ruby on Rails**, **PostgreSQL** e **React.js**. O objetivo inicial era criar uma aplicação de lista de tarefas com suporte para múltiplas listas. Contudo, foi adicionada uma série de funcionalidades extras para tornar a experiência mais dinâmica e envolvente, incluindo um sistema de **gameficação**.

## Funcionalidades 🌟

- **Múltiplas listas**: 
  - O usuário pode criar **categorias** que funcionam como diferentes listas de tarefas.
  - Sem limites para o número de categorias criadas.

- **Tarefas organizadas**:
  - Divisão entre **Tarefas para Fazer** e **Tarefas Concluídas**.
  
- **Gameficação**: 
  - Cada tarefa possui um **nível de dificuldade** (Fácil, Médio, Difícil), que concede uma quantidade de pontos ao ser concluída.
  - Ao atingir a quantidade necessária de XP, o usuário **sobe de nível**:
    - Animação com **fogos de artifício**.
    - Opção para **apagar todas as tarefas concluídas** ou mantê-las.

---

## Tecnologias Utilizadas 🛠️

### Backend:
- **Ruby on Rails**
- **PostgreSQL**

### Frontend:
- **React.js**
- **Axios** para requisições HTTP
- **React-Confetti** para animações visuais

### Outros:
- **HTML5** e **CSS3** para estilização
- **React Icons** para ícones visuais

---

## Motivos das Tecnologias Utilizadas e Dificuldades 🌐

### React.js:
Já possuía familiaridade com a tecnologia, pois há mais de 7 meses estudo e trabalho em projetos freelancers utilizando React. Apesar disso, continuo em constante aprendizado e aperfeiçoamento.

### Ruby on Rails:
Antes deste projeto, não tinha experiência prévia com Ruby ou Rails. Também não possuía tanta expertise em aplicações fullstack. Contudo, aceitei o desafio com entusiasmo e me dediquei a aprender a tecnologia do zero. Sempre adotei a premissa de que não tenho uma "linguagem de estimação" e estou disposto a aprender o que for necessário para resolver problemas de forma lógica e eficiente.

### Dificuldades:
- Nunca havia desenvolvido uma aplicação fullstack ponta a ponta. Foi um processo intenso, que exigiu muitas horas de dedicação não apenas para codificar, mas para entender profundamente as estruturas e boas práticas.
- Aprendi a configurar e conectar backend e frontend de maneira eficiente, um aprendizado valioso que levarei para futuros projetos.
- Enfrentei desafios ao implementar a gameficação, especialmente na lógica de XP e níveis, mas foi incrivelmente recompensador ao ver o sistema funcionando.

---

## Configuração do Projeto 💻

Siga os passos abaixo para rodar a aplicação em sua máquina local:

### Pré-requisitos:
Certifique-se de ter as seguintes ferramentas instaladas:
- [Ruby](https://www.ruby-lang.org/)
- [Rails](https://rubyonrails.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)

### 1. Clonar o Repositório:
```bash
$ git clone https://github.com/seu-usuario/seu-repositorio.git](https://github.com/DevKelvinbd/v2-Todo.git
$ cd seu-repositorio
```

### 2. Configurar o Backend:
1. Instale as dependências:
   ```bash
   $ bundle install
   ```
2. Configure o banco de dados:
   ```bash
   $ rails db:create db:migrate db:seed
   ```
3. Inicie o servidor do Rails:
   ```bash
   $ rails server
   ```
   O servidor estará disponível em [http://localhost:3000](http://localhost:3000).

### 3. Configurar o Frontend:
1. Navegue até a pasta do frontend:
   ```bash
   $ cd client
   ```
2. Instale as dependências:
   ```bash
   $ npm install
   ```
3. Inicie o servidor do React:
   ```bash
   $ npm run dev
   ```
   O frontend estará disponível em [http://localhost:3001](http://localhost:3001).

### 4. Testar a Aplicação:
- Acesse o frontend e interaja com a aplicação, criando categorias, tarefas e testando a gameficação!

---

## Estrutura do Banco de Dados 📊

### **Tabela: Categories**
| Coluna       | Tipo   | Descrição                 |
|--------------|--------|---------------------------|
| `id`         | Integer| ID único da categoria     |
| `name`       | String | Nome da categoria         |
| `created_at` | DateTime | Data de criação          |
| `updated_at` | DateTime | Data de atualização      |

### **Tabela: Todos**
| Coluna         | Tipo     | Descrição                           |
|----------------|----------|-------------------------------------|
| `id`           | Integer  | ID único da tarefa                 |
| `todo_name`    | String   | Nome da tarefa                     |
| `completed`    | Boolean  | Indica se a tarefa foi concluída   |
| `category_id`  | Integer  | Relacionamento com a tabela `categories` |
| `difficulty`   | String   | Nível de dificuldade da tarefa     |
| `description`  | Text     | Descrição detalhada da tarefa      |
| `created_at`   | DateTime | Data de criação                    |
| `updated_at`   | DateTime | Data de atualização                |

### **Tabela: Users**
| Coluna       | Tipo     | Descrição                     |
|--------------|----------|-------------------------------|
| `id`         | Integer  | ID único do usuário           |
| `name`       | String   | Nome do usuário              |
| `xp`         | Integer  | Pontos de experiência         |
| `level`      | Integer  | Nível do usuário             |
| `created_at` | DateTime | Data de criação              |
| `updated_at` | DateTime | Data de atualização          |

---

## Diferenciais 🌟

1. **Gameficação**:
   - Adição de níveis, pontuação por tarefas e feedback visual ao progredir.

2. **Flexibilidade**:
   - Suporte para múltiplas listas de tarefas com categorias ilimitadas.

3. **Experiência de Usuário**:
   - Animações envolventes para celebrar o progresso do usuário.

---

## Próximos Passos 🔮
- Implementar autenticação de usuários para personalização da experiência.
- Adicionar testes automatizados com RSpec e Capybara.
- Melhorar o design responsivo para dispositivos móveis.

---

## Autor 👨‍💻
Desenvolvido por **Kelvin Dias** como parte do processo seletivo para a empresa **V360**.

## Vídeo da Aplicação em Produção 📷
https://drive.google.com/drive/folders/150AAJD9-6TWKW6eGiWt8XG26s0POo5EG?usp=sharing

---

Se tiver dúvidas ou sugestões, fique à vontade para entrar em contato!
