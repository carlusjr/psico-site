import { createContext, useState, useEffect, useContext } from "react";
import { parseCookies } from "nookies";
import { verify } from 'jsonwebtoken';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState(null);  
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
    
  return (
    <AuthContext.Provider value={{ userLogged, setUserLogged }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export default useAuth

    //   verify(token, mySecret, function (err, decoded) {
    //     if ((!err) && (decoded)) {
    //       setUserLogged(decoded.username);
    //       console.log(userLogged);
    //     }
    //   });      
    // }