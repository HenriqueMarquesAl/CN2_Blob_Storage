const express = require('express');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
const path = require('path');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// SUA CHAVE DA AZURE (DIRETO NO CÓDIGO)
const AZURE_CONN = "DefaultEndpointsProtocol=https;AccountName=exercicioblobstorage;AccountKey=63XwlADZ/nzcaxIaMzsauKor5arx5Zof02B0P4dMqbu6Smdoyp8GKBScw/6mbh2+U912k9n3NWbD+AStXa0e5w==;EndpointSuffix=core.windows.net";
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_CONN);

// NOME DO SEU CONTAINER
const containerName = "imagens"; 
const containerClient = blobServiceClient.getContainerClient(containerName);

// Servir a pasta public (onde está o seu index.html novo)
app.use(express.static('public'));

// 1. ROTA DE UPLOAD
app.post('/upload', upload.single('arquivo'), async (req, res) => {
    try {
        const blobName = req.file.originalname;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.uploadData(req.file.buffer);
        // Redireciona de volta para a página inicial após o upload
        res.redirect('/');
    } catch (err) {
        res.status(500).send("Erro no upload: " + err.message);
    }
});

// 2. ROTA DE LISTAGEM (JSON para a interface nova carregar)
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

// 3. ROTA DE DOWNLOAD (Cumprindo o requisito do Eduardo)
app.get('/download/:nome', async (req, res) => {
    try {
        const blobName = req.params.nome;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const downloadResponse = await blockBlobClient.download();
        
        res.setHeader('Content-Disposition', `attachment; filename="${blobName}"`);
        downloadResponse.readableStreamBody.pipe(res);
    } catch (err) {
        res.status(500).send("Erro no download: " + err.message);
    }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log('=========================================');
    console.log(`SERVIDOR PROFISSIONAL RODANDO EM:`);
    console.log(`http://localhost:${PORT}`);
    console.log('=========================================');
});