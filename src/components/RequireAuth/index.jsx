import {Navigate, useLocation} from "react-router-dom";
import PropTypes from "prop-types";
import {useAuth} from "../../contexts/AuthContext";

const RequireAuth = ({children}) => {
  const location = useLocation();
  const {user} = useAuth();

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they log in, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{from: location}} replace />;
  }

  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;