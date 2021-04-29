import { Users } from '../../src/users';
import cookie from 'cookie';
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken';

export default async function login(request, response) {
  // Somente método GET
  if (request.method === "POST") {
    const userName = request.body.user_name;
    const userPassword = request.body.user_password;
    const myUser = new Users(userName, userPassword);
    const dbUser = await myUser.getDbUserByName(userName);

    let isLogin = false;
    if (dbUser) {
      const dbPassword = dbUser.user_password;
      isLogin = await bcrypt.compare(userPassword, dbPassword);
    }
    if (isLogin) {
      const user = { id: dbUser.user_id, username: dbUser.user_name };
      // JWToken de 30 minutos
      const jwt = sign(user, process.env.UUID_JWT, { expiresIn: 15 * 60 });
      // Insere cookie com JWT no cabeçalho da requisição
      response.setHeader('Set-Cookie', cookie.serialize('jwtpsiconet', jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 900,
        path: '/'
      }));
      response.json({ message: 'Successful authentication.' });
    } else {
      response.status(401).json({ message: "Sorry, failed login." });
    }
  } else {
    response.status(405).json({ message: "API only support POST method." });
  }
}
