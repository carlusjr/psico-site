import verifyJWT from "../../src/verifyJWT";

export default async function logged(req, res) {
  const { cookies } = req;
  const token = cookies.jwtpsicosite || '';  
  const resToken = verifyJWT(token);
  if (resToken) {    
    res.json(resToken);
  } else {    
    res.status(401).json({ logging: true, logged: false, id: null, name: null });
  }
}