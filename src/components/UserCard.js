import { FaUser, FaTrash } from "react-icons/fa";
import style from "../../styles/userCard.module.css";

const UserCard = ({User, removeClick}) => {
  return (
    <div className={style.userCard}>
      <FaUser />
      <label className={style.userName}>{User.user_name}</label>
      <label className={style.userId}>Id: <b>{User.user_id}</b></label>
      <label className={style.userEmail}>
        {User.user_email}
        <button className={style.btnExcluir} onClick={() => removeClick(User.user_id)}><FaTrash /> Excluir</button>        
      </label>
    </div>
  )
}

export default UserCard