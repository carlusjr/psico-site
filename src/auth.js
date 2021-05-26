import { verify } from 'jsonwebtoken'

export default function IsAuth(request) {
  const mySecret = process.env.UUID_JWT;
  const token = request.headers.authorization
  const decode = verify(token, mySecret);  
  return true;
}