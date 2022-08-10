import {useNavigate} from "react-router-dom";
import {startTransition} from "react";

const useTransNavigate = () => {
  const navigate = useNavigate();
  
  return (url) => startTransition(() => {
    navigate(url);
  });
};

export default useTransNavigate;