import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useApiRequest from "../../../hooks/useApiRequest";
import useUserAuth from "../../../hooks/useUserAuth";

const useUserRegistration = () => {
  const axios = useApiRequest();
  const navigate = useNavigate();
  const { login } = useUserAuth();

  return useMutation({
    mutationKey: ["register"],
    mutationFn: async ({ username, password, full_name }) => {
      const { data } = await axios.post(`/register`, {
        username,
        password,
        full_name,
      });
      return data;
    },
    onSuccess: (data, variables) => {
      login(variables.username, variables.password);
      navigate("/");
    },
  });
};

export default useUserRegistration;