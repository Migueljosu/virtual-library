//services/googleDriveServices
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const uploadFile = async (filePath, fileName, mimeType) => {
  const drive = google.drive({ version: 'v3', auth: process.env.GOOGLE_API_KEY });

  const fileMetadata = {
    name: fileName,
    mimeType: mimeType
  };

  const media = {
    mimeType: mimeType,
    body: fs.createReadStream(filePath)
  };

  try {
    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    return file.data.webViewLink; // Retorna o link público do arquivo
  } catch (error) {
    console.error('Erro ao fazer upload para o Google Drive:', error);
    throw new Error('Erro ao fazer upload para o Google Drive');
  }
};

module.exports = { uploadFile };
