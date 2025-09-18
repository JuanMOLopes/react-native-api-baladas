# React Native API Baladas

Este projeto foi desenvolvido para demonstrar a criação de uma aplicação completa para gerenciamento de baladas, com backend em **Node.js** e frontend em **React Native**. O sistema permite realizar operações CRUD (Create, Read, Update, Delete) em uma base de dados SQLite.

---

## 🚀 Funcionalidades

- **Listar Baladas**: Visualize todas as baladas cadastradas.
- **Buscar por Cidade**: Encontre baladas por cidade.
- **Buscar por Data**: Encontre baladas por data.
- **Cadastrar Balada**: Adicione novas baladas ao sistema.
- **Atualizar Balada**: Edite informações de baladas existentes.
- **Excluir Balada**: Remova baladas da base de dados.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js**
- **Express**
- **Cors**
- **SQLite**

### Frontend
- **React Native**
- **Expo**
- **React Navigation**

---

## 📋 Rotas da API

- **GET** `/baladas`: Retorna todas as baladas.
- **GET** `/baladas/cidade/:cidade`: Retorna baladas por cidade.
- **GET** `/baladas/data/:data`: Retorna baladas por data.
- **POST** `/baladas`: Cria uma nova balada.
- **PUT** `/baladas/:id`: Atualiza uma balada existente.
- **DELETE** `/baladas/:id`: Remove uma balada.

---

## 🖼️ Telas do Aplicativo

- **Tela Inicial**: Apresentação do app.
- **Tela Read**: Lista de baladas e busca por cidade/data.
- **Tela Create**: Cadastro de novas baladas.
- **Tela Update**: Atualização de informações.
- **Tela Delete**: Exclusão de baladas.

---

## ⚙️ Instalação e Inicialização

### Backend

1. Navegue até a pasta do backend:
   ```sh
   cd backend
   ```
2. Instale as dependências:
   ```sh
   npm install express cors sqlite3
   ```
3. Inicie o servidor:
   ```sh
   node app.js
   ```

### Frontend

1. Navegue até a pasta do frontend:
   ```sh
   cd frontend\baladas-app
   ```
2. Instale as dependências:
   ```sh
   npm install expo@latest react@latest react-dom@latest react-native @react-navigation/native @react-navigation/drawer react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens react-native-vector-icons react-dom react-native-web @expo/metro-runtime
   ```
   ```sh
   npx expo install react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens react-native-vector-icons
   ```
3. Inicie o aplicativo:
   ```sh
   npm start
   ```

---

## 👨‍💻 Grupo

- Agatha Aline França
- Ana Beatriz Farias Pereira
- Juan Matheus de Oliveira Lopes
- Lucas Aguiar Pereira Marin
- Zayra Alice França

**Senai Valinhos - Análise e Desenvolvimento de Sistemas**