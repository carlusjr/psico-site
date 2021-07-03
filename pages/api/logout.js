import cookie from 'cookie'

export default async function logout(request, response) { 
  try {
    response.setHeader('Set-Cookie', cookie.serialize('jwtpsicosite', "deleted", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: -1, // apaga o cookie
      path: '/'
    }));
    response.json({ message: "Session deleted." })    
  }
  catch (e) {
    response.status(401).json({ message: e.message });      
  }  
}