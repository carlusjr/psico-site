import { verify } from 'jsonwebtoken';

export default function loggedIn(context) {
  try {
    const mySecret = process.env.UUID_JWT;
    const token = (context.request.cookies.jwtpsiconet || '');
    const decode = verify(token, mySecret);
    const userName = (decode.username || '');
    return JSON.parse({ secret: mySecret, token: token, user: userName });
  } catch (error) {
    return false;
  }
}