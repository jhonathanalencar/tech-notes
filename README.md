# techNotes API

## 🎯 Objetivo

Gerenciar usuários e notas.

[Acesse a documentação](https://tech-notes-server.onrender.com/api-docs/)

## ✅ Requisitos

### Rotas da aplicação

#### Auth

- [x] POST /auth
- [x] GET /auth/refresh
- [x] POST /auth/logout

#### Users

- [x] POST /users
- [x] GET /users
- [x] PATCH /users
- [x] DELETE /users

#### Notes

- [x] POST /notes
- [x] GET /notes
- [x] PUT /notes
- [x] DELETE /notes

### Específicação dos testes

#### Auth

- [x] Should be able to login user
- [x] Should not be able to a non existing user login
- [x] Should not be able to an inactive user login
- [x] Should not be able to a user login when password is invalid
- [x] Should be able to get a new access token
- [x] Should not be able to get a new access token when refresh token is already expired
- [x] Should not be able to get a new access token whithout a refresh token
- [x] Should be able to logout user
- [x] Should be able to logout user without refresh token

#### Users

- [x] Should be able to create new users
- [x] Should not be able to create new users when username is already taken
- [x] Should not be able to a non manager or admin user create new users
- [x] Should be able to list all users
- [x] Should not be able to a non manager or admin user get list of all users
- [x] Should be able to update user
- [x] Should not be able to update a non existing user
- [x] Should not be able to update user when username is already taken
- [x] Should not be able to a non manager or admin user update a user
- [x] Should be able to delete user
- [x] Should not be able to delete a non existing user
- [x] Should not be able to delete a user with assigned notes
- [x] Should not be able to a non manager or admin user delete a user

#### Notes

- [x] Should be able to create new notes
- [x] Should not be able to create new notes when title is already taken
- [x] Should not be able to assign notes to inactive users
- [x] Should not be able to assign notes to a non existing user
- [x] Should be able to list all notes
- [x] Should be able to update note
- [x] Should not be able to update a non existing note
- [x] Should not be able to update note when title is already taken
- [x] Should not be able to a non manager or admin user update a note
- [x] Should be able to a non manager or admin user update their assigned notes
- [x] Should not be able to assign updated note to a non existing user
- [x] Should not be able to assign updated note to a inactive user
- [x] Should be able to delete note
- [x] Should not be able to delete a non existing note
- [x] Should not be able to a non manager or admin user delete a note

## 🚀 Como executar

```bash
# Clone este repositório
$ git clone https://github.com/jhonathanalencar/tech-notes.git

# Entre na pasta
$ cd tech-notes

# Instale as dependências
$ npm install

# Preencha e copie as variáveis de ambiente do arquivo .env.example para o arquivo .env na raiz do projeto

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3500
acesse <http://localhost:3500>
```
