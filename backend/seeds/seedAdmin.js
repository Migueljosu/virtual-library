const User = require("../models/userModel");
const bcrypt = require("bcrypt");

async function seedAdmin() {
  try {
    // Verifica se já existe um usuário com o e-mail admin@admin.com
    const existingUser = await User.findOne({
      where: {
        email: 'josuluis29@gmail.com'
      }
    });

    if (existingUser) {
      console.log('Usuário admin já existe!');
    } else {
      // Encripta a senha
      const hashedPassword = await bcrypt.hash('Mi29guel', 10); // 10 é o número de saltos

      // Cria o usuário admin se não existir
      const newAdmin = await User.create({
        name: 'Miguel Luís',
        email: 'josuluis29@gmail.com',
        password: hashedPassword,  // Senha encriptada
        role: 'admin',
        plan: 'free'
      });

      console.log('Usuário admin criado com sucesso:', newAdmin.email);
    }
  } catch (error) {
    console.error('Erro ao criar o usuário admin:', error);
  }
}

// Chama a função de seed
seedAdmin();
