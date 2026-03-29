const express = require('express');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
const { TableClient } = require('@azure/data-tables');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// ===============================
// CONEXÃO AZURE (DIRETA SEM .ENV)
// ===============================
// Cole sua string de conexão completa entre as aspas abaixo:
const AZURE_CONN = "DefaultEndpointsProtocol=https;AccountName=exercicioblobstorage;AccountKey=63XwlADZ/nzcaxIaMzsauKor5arx5Zof02B0P4dMqbu6Smdoyp8GKBScw/6mbh2+U912k9n3NWbD+AStXa0e5w==;EndpointSuffix=core.windows.net";

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_CONN);
const tableClient = TableClient.fromConnectionString(AZURE_CONN, "logimagens");

// ===============================
// CONFIGURAÇÃO DO CONTAINER
// ===============================
const containerName = "imagens";
const containerClient = blobServiceClient.getContainerClient(containerName);

// Função para garantir que os recursos existam na Azure ao iniciar
async function initializeAzure() {
    try {
        await containerClient.createIfNotExists({ access: 'blob' });
        await tableClient.createTable();
        console.log("✅ Conexão com Azure estabelecida!");
        console.log("📂 Container 'imagens' e Tabela 'logimagens' verificados.");
    } catch (err) {
        console.error("❌ Erro ao conectar com Azure:", err.message);
    }
}
initializeAzure();

// Servir arquivos estáticos da pasta public
app.use(express.static('public'));

// ===============================
// ROTA: UPLOAD (BLOB + TABLE LOG)
// ===============================
app.post('/upload', upload.single('arquivo'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send("Selecione um arquivo primeiro.");

        const blobName = req.file.originalname;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        
        // 1. Upload para o Blob Storage
        await blockBlobClient.uploadData(req.file.buffer);

        // 2. Registro de Log no Table Storage
        const agora = new Date();
        const logEntry = {
            partitionKey: "UploadAction",
            rowKey: Date.now().toString(),
            nomeFoto: blobName,
            dataCadastro: agora.toLocaleDateString('pt-BR'),
            horarioCadastro: agora.toLocaleTimeString('pt-BR'),
            ipMaquina: req.ip === "::1" ? "127.0.0.1" : req.ip 
        };

        await tableClient.createEntity(logEntry);
        
        console.log(`✔ Arquivo ${blobName} enviado e log gerado.`);
        res.redirect('/'); // Volta para a página principal
    } catch (err) {
        console.error("Erro no processo de upload:", err);
        res.status(500).send("Erro interno no servidor Azure.");
    }
});

// ===============================
// ROTA: LISTAR ARQUIVOS (JSON)
// ===============================
app.get('/listar_json', async (req, res) => {
    try {
        let arquivos = [];
        for await (const blob of containerClient.listBlobsFlat()) {
            arquivos.push(blob.name);
        }
        res.json(arquivos);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// ===============================
// ROTA: BUSCAR LOGS (TABLE)
// ===============================
app.get("/logs", async (req, res) => {
    try {
        const logs = [];
        const entities = tableClient.listEntities();
        for await (const entity of entities) {
            logs.push(entity);
        }
        // Inverte para mostrar os logs mais recentes primeiro
        res.json(logs.reverse()); 
    } catch (err) {
        console.error("Erro ao buscar logs:", err);
        res.status(500).json({ erro: "Erro ao acessar Table Storage" });
    }
});

// ===============================
// ROTA: DOWNLOAD
// ===============================
app.get('/download/:nome', async (req, res) => {
    try {
        const blobName = req.params.nome;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const downloadResponse = await blockBlobClient.download();

        res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(blobName)}"`);
        downloadResponse.readableStreamBody.pipe(res);
    } catch (err) {
        res.status(500).send("Erro ao baixar arquivo.");
    }
});

// ===============================
// INICIALIZAÇÃO DO SERVIDOR
// ===============================
const PORT = 3000;
app.listen(PORT, () => {
    console.log("================================");
    console.log(`🚀 Servidor On: http://localhost:${PORT}`);
    console.log("================================");
});