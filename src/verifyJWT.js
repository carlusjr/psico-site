import { verify } from 'jsonwebtoken';

const verifyJWT = (tokenJWT) => {
  if (!tokenJWT) {
    return null
  }
  try {
    const mySecret = process.env.UUID_JWT;   
    const decode = verify(tokenJWT, mySecret);        
    return { logging: true, logged: true, id: decode.id, name: decode.username };
  } catch (error) {
    return null
  }
}

export default verifyJWT