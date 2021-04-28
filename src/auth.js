import { verify } from 'jsonwebtoken'

export default function IsAuth(request) {
  const mySecret = process.env.UUID_JWT;
  const token = request.headers.authorization
  const decode = verify(token, mySecret);
  console.log('Secret: ', mySecret);
  console.log('Token:', token);
  console.log('Decode:', decode);
  return true;
}