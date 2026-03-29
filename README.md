# ☁️ CN2_Blob_Storage - Azure Cloud Integration & Audit

Este projeto é uma aplicação **Node.js** desenvolvida para a disciplina de Cloud Computing na **FATEC Cotia**. O foco é a integração prática com múltiplos serviços de armazenamento da Microsoft Azure, permitindo a gestão de arquivos (Blobs) e a auditoria de operações em tempo real (Tables).

---

## 🚀 Funcionalidades Principais

O sistema oferece uma interface web profissional e responsiva para realizar as operações de:

* **📤 Upload de Arquivos:** Envio de imagens e documentos para o container `imagens` no Azure Blob Storage.
* **📑 Auditoria Automática (New!):** Cada upload gera um log automático no **Azure Table Storage**, registrando nome do arquivo, data, hora e IP de origem.
* **📂 Listagem Híbrida:** Visualização dinâmica dos arquivos armazenados e consulta ao histórico de logs de auditoria.
* **📥 Download Direto:** Recuperação de arquivos da nuvem para a máquina local com um clique.
* **🛡️ Segurança de Dados:** Gerenciamento de credenciais via variáveis de ambiente (`.env`) para proteção de chaves sensíveis.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
| :--- | :--- |
| **Node.js** | Ambiente de execução JavaScript Server-side |
| **Express** | Framework para rotas e middleware |
| **Azure Blob Storage** | Armazenamento de objetos para arquivos e imagens |
| **Azure Table Storage** | Banco de dados NoSQL chave-valor para logs de auditoria |
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
    Crie um arquivo `.env` na raiz do projeto e adicione sua Connection String da Azure:
    ```env
    AZURE_STORAGE_CONNECTION_STRING="sua_connection_string_aqui"
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

> **Nota:** Este projeto foi desenvolvido para fins acadêmicos e demonstra o domínio de infraestrutura em nuvem, integração de APIs e persistência de dados em serviços PaaS (Platform as a Service).
