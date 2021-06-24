import { Users } from '../../src/users';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie'

export default async function login(request, response) {

  let logged = false;

  // Somente método POST
  if (request.method !== "POST") {
    response.status(405).json({ message: "API suporta apenas método POST." });
    return logged;
  }

  // Obtém credenciais do usuário pelo request    
  const userName = request.body.user_name;
  const userPassword = request.body.user_password;
  const myUser = new Users(userName, userPassword);

  // Pesquisa usuário no Banco de Dados
  const dbUser = await myUser.getDbUserByName(userName);       
  if (dbUser) {
    // Se encontrou usuário, verifica a senha encriptada
    const bcrypt = require('bcryptjs');
    const dbPassword = dbUser.user_password;
    logged = await bcrypt.compare(userPassword, dbPassword);
  }

  // Usuário ou senha inválidos
  if (!logged) {
    response.status(401).json({ message: "Falha de login, usuário ou senha inválido!" });      
    return logged;
  }
  
  // Token gerado no servidor
  
  const user = { id: dbUser.user_id, username: dbUser.user_name };
  const jwt = sign(user, process.env.UUID_JWT, { expiresIn: 15 * 60 });

  // Insere cookie com JWT no cabeçalho da requisição
  response.setHeader('Set-Cookie', cookie.serialize('jwtpsicosite', jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 900, //15 minutos
    path: '/'
  }));
  
  response.json({ userId: dbUser.user_id, userName: dbUser.user_name });
}
