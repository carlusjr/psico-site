import { createContext, useReducer } from "react";

export const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {

  const notifications = [];

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_NOTIFICATION":
        return [...state, action.payload ];
      case "DELETE_NOTIFICATION":
        return state.filter(
          (notification) => notification.id !== action.payload
        );
      default:
        return state;  
    }
  }, notifications);
  
  return (
    <ToastContext.Provider value={{state, dispatch}}>
      {children}
    </ToastContext.Provider>
  );
};


/***
 * {
      id: uuidv4(),
      type: "SUCCESS",
      title: "Operação bem sucedida!",
      message: "Todas informações foram gravadas.",
    },
    {
      id: uuidv4(),
      type: "INFO",
      title: "Título da informação!",
      message: "Maiores detalhes da informação.",
    },
    {
      id: uuidv4(),
      type: "WARNING",
      title: "Título do aviso de ATENÇÃO!",
      message: "Maiores detalhes do aviso de ATENÇÃO.",
    },
    {
      id: uuidv4(),
      type: "ERROR",
      title: "Título do ERRO!",
      message: "Maiores detalhes sobre o erro.",
    },
 */