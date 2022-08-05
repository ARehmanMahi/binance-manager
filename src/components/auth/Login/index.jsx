import styles from "./index.module.css";
import {useAuth} from "../../../contexts/AuthContext";
import {useLocation, useNavigate} from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const from = location.state?.from?.pathname || "/";

  const loginHandler = () => {
    auth.login().then(() => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, {replace: true});
    });
  };

  return (
    <div className={styles.container}>
      <button onClick={() => loginHandler()} className={styles.button}>
        <img src="/images/googlelogo.png" alt="Google Logo" />
        Continue with Google
      </button>
    </div>
  );
};

export default Login;
