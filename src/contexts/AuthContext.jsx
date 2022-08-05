import React, {useContext, useEffect, useState} from "react";
import {auth} from "../firebase/client";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import PropTypes from "prop-types";
import PageLoader from "../components/PageLoader";

const AuthContext = React.createContext(null);

const AuthProvider = ({children: Children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  function login() {
    return signInWithGoogle();
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    return onAuthStateChanged(auth, authUser => {
      setUser(authUser);
      setLoading(false);
    });
  }, []);

  const value = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <PageLoader /> : Children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => {
  return useContext(AuthContext);
};

export {useAuth, AuthProvider};