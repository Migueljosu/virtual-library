const { google } = require('googleapis');
const readlineSync = require('readline-sync');

// Substitua com os seus valores reais
const CLIENT_ID = '91576468058-ferln0le4vkbgf11a9b9a4bqlvc34e9k.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/google/auth/callback';  // A URL de redirecionamento

// Criar o cliente OAuth2
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Geração do URL de autenticação
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',  // Necessário para o refresh_token
  scope: ['https://www.googleapis.com/auth/drive.file'],  // Escopo de permissões de upload no Google Drive
});

console.log('Autorize este aplicativo visitando o seguinte link:', authUrl);

// Solicitar o código de autorização
const code = readlineSync.question('Digite o código dessa página aqui: ');

// Trocar o código por access_token e refresh_token
oAuth2Client.getToken(code, (err, tokens) => {
  if (err) {
    console.log('Erro ao recuperar o token de acesso:', err);
    return;
  }

  // Salvar os tokens em um arquivo JSON
  const fs = require('fs');
  fs.writeFileSync('tokens.json', JSON.stringify(tokens));
  console.log('Access Token:', tokens.access_token);
  console.log('Refresh Token:', tokens.refresh_token);

  // Configurar os tokens no cliente OAuth2 para usá-los
  oAuth2Client.setCredentials({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    scope: 'https://www.googleapis.com/auth/drive.file',
    token_type: 'Bearer',
    expiry_date: tokens.expiry_date,
  });

  console.log('Tokens configurados com sucesso!');
});
