import { createContext, useState, useEffect, useContext } from "react";
// import { parseCookies } from "nookies";
// import { verify } from 'jsonwebtoken';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    logged: false,
    id: "",
    name: "",
  });  
  
  /*
  const mySecret = process.env.UUID_JWT;
  useEffect(()=>{
    if (!userLogged) {
      const { "jwt.psico-site": token } = parseCookies();    
      if (token) {
        try {
          const decoded = verify(token, mySecret);
          setUserLogged(decoded.userName);
        }
        catch (e) {
          setUserLogged(null);
          console.log(e.message);
        }      
      }
    }
  },[])
  */
    
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export default useAuth

    