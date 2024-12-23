const nodemailer = require('nodemailer');

// Criação do transportador SMTP para Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'josuluis29@gmail.com',
    pass: 'lrer ttzt esti utut'             // Sua senha do Gmail (ou senha de app, caso tenha 2FA)
  }
});

// Função para enviar o email
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'josuluis29@gmail.com',   // O email que está enviando
    to,                           // Destinatário
    subject,                      // Assunto
    text                          // Corpo do email
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
};

module.exports = sendEmail;
