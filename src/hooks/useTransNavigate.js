import { useNavigate } from "react-router-dom";
import { useTransition } from "react";

const useTransNavigate = () => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const transNavigate = (url) =>
    startTransition(() => {
      navigate(url);
    });

  return [isPending, transNavigate];
};

export default useTransNavigate;
