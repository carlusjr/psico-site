import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({ logged: false, logging: true, id: null, name: null });
  
  const isLoggedJWT = async () => {
    const res = await fetch("/api/logged");
    const resJSON = await res.json();    
    if (res.ok) {
      return resJSON;
    } else {
      return { logged: false, logging: false, id: null, name: null };
    }
  };

  useEffect(() => {    
    if (!userAuth.logged) {
      userAuth.logging = true;
      isLoggedJWT().then( (res) => {        
        setUserAuth(res);
        userAuth.logging = false;
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
