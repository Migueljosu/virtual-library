const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

// Configuração do Google Drive API
const drive = google.drive({ version: 'v3', auth: process.env.GOOGLE_API_KEY });

async function uploadFile(filePath, fileName, mimeType) {
  try {
    const fileMetadata = {
      name: fileName,
      mimeType: mimeType,
    };

    const media = {
      body: fs.createReadStream(filePath),
    };

    const res = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webContentLink',
    });

    return res.data.webContentLink; // Retorna o link público do arquivo
  } catch (error) {
    console.error('Erro ao fazer upload para o Google Drive:', error);
    throw new Error('Erro ao fazer upload para o Google Drive');
  }
}

module.exports = { uploadFile };
