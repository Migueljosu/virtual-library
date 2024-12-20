const { getAuthUrl, getToken } = require('../config/googleAuth');
const googleDriveService = require('../services/googleDriveService');

// Inicia o processo de login com o Google
exports.authGoogle = (req, res) => {
    const authUrl = getAuthUrl();
    res.redirect(authUrl);  // Redireciona para a URL de login
};

// Callback após a autenticação
exports.googleCallback = async (req, res) => {
    const { code } = req.query;
    try {
        const tokens = await getToken(code);
        // Salvar tokens no banco de dados ou na sessão
        res.send('Autenticado com sucesso!');
    } catch (error) {
        console.error('Erro ao autenticar:', error);
        res.status(500).send('Erro na autenticação');
    }
};

// Rota para upload de arquivo para o Google Drive
exports.uploadFile = async (req, res) => {
    const { file } = req;  // Supondo que você tenha um middleware para lidar com uploads
    try {
        const fileUrl = await googleDriveService.uploadFile(file);
        res.json({ fileUrl });
    } catch (error) {
        console.error('Erro ao enviar arquivo:', error);
        res.status(500).send('Erro ao enviar arquivo');
    }
};
