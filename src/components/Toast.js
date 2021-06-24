import style from "../../styles/toast.module.css";
import { useContext, useState } from "react";
import { ToastContext } from "../contexts/toastContext";
import {
  FaCheck,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaRegWindowClose,
} from "react-icons/fa";

export const Toast = ({ position, setTime }) => {
  const { state, dispatch } = useContext(ToastContext);

  const toastKind = (type) => {
    switch (type) {
      case "SUCCESS":
        return { icon: <FaCheck />, color: "green" };
      case "INFO":
        return { icon: <FaInfoCircle />, color: "blue" };
      case "WARNING":
        return { icon: <FaExclamationTriangle />, color: "orange" };
      case "ERROR":
        return { icon: <FaExclamationCircle />, color: "red" };
      default:
        return;
    }
  };

  const handleCloseToast = (id) => {
    dispatch({ type: "DELETE_NOTIFICATION", payload: id });
  };

  if (!state) {
    return <div></div>
  };

  return (    
    <div className={`${style.container} ${style[position]}`}>
      {state.map((notification, i) => {
        if (setTime) {
          setTimeout(() => {
            dispatch({ type: "DELETE_NOTIFICATION", payload: notification.id });
          }, setTime);
        }
        return (
          <div
            key={notification.id}
            className={`${style.toast} ${style[position]}`}
            style={{ backgroundColor: toastKind(notification.type).color }}
          >
            <FaRegWindowClose className={style.close} onClick={() => handleCloseToast(notification.id)}/>
            <div className={style.image}>
              {toastKind(notification.type).icon}
            </div>
            <div>
              <p className={style.title}>{notification.title}</p>
              <p className={style.message}>{notification.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
