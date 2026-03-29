# ☁️ CN2_Blob_Storage - Azure Cloud Integration

Este projeto é uma aplicação **Node.js** desenvolvida para a disciplina de Cloud Computing, focada na integração prática com o **Azure Blob Storage**. A aplicação permite o gerenciamento de arquivos diretamente na nuvem da Microsoft, utilizando o SDK oficial da Azure.

---

## 🚀 Funcionalidades Principais

O sistema oferece uma interface web profissional e responsiva para realizar as operações de:

* **📤 Upload de Arquivos:** Envio de imagens e documentos para o container `imagens` na Azure.
* **📂 Listagem em Tempo Real:** Visualização dinâmica de todos os blobs armazenados.
* **📥 Download Direto:** Recuperação de arquivos da nuvem para a máquina local com um clique.
* **🛡️ Segurança de Dados:** Gerenciamento de credenciais via variáveis de ambiente (`.env`) e proteção de chaves no Git.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
| :--- | :--- |
| **Node.js** | Ambiente de execução JavaScript Server-side |
| **Express** | Framework para rotas e middleware |
| **Azure SDK** | Biblioteca `@azure/storage-blob` para comunicação com a nuvem |
| **Tailwind CSS** | Framework CSS para interface moderna e responsiva |
| **Multer** | Middleware para manipulação de arquivos (upload) |
| **FontAwesome** | Biblioteca de ícones profissionais |

---

## 📦 Como Instalar e Rodar

1.  **Clone o projeto:**
    ```bash
    git clone [https://github.com/HenriqueMarquesAl/CN2_Blob_Storage.git](https://github.com/HenriqueMarquesAl/CN2_Blob_Storage.git)
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o arquivo `.env`:**
    Crie um arquivo `.env` na raiz e adicione sua Connection String da Azure:
    ```env
    AZURE_STORAGE_CONNECTION_STRING="sua_chave_aqui"
    ```

4.  **Inicie o servidor:**
    ```bash
    node app.js
    ```

5.  **Acesse no navegador:**
    [http://localhost:3000](http://localhost:3000)

---

## 👨‍💻 Autor

**Henrique Marques** *Estudante de Desenvolvimento de Software na FATEC Cotia*

---

> **Nota:** Este projeto foi desenvolvido para fins acadêmicos e demonstra o domínio de infraestrutura em nuvem e integração de APIs.
