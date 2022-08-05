import styles from "./index.module.css";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../contexts/AuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const logoutHandler = () => {
    auth.logout().then(() => {
      navigate("/");
    });
  };

  return (
    <div className={styles.container}>
      <button onClick={() => logoutHandler()} className={styles.button}>
        Sign Out
      </button>
    </div>
  );
};

export default Logout;
