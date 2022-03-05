import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/token";

export default function useAuth() {
  const navigation = useNavigate();
  const localToken = getToken();

  useEffect(() => {
    if (localToken === null) {
      navigation('/login');
    }
  }, []);
  
  return {localToken: localToken as string}
}