import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useApiRequest from '../../../hooks/useApiRequest';
import useUserAuth from '../../../hooks/useUserAuth';

const useUserLogin = () => {
  const axios = useApiRequest();
  const navigate = useNavigate();
  const { login } = useUserAuth();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: async ({ username, password }) => {
      const { data } = await axios.post(`/login`, {
        username,
        password,
      });
      return data;
    },
    onSuccess: (data, variables) => {
      login(variables.username, variables.password);
      navigate('/');
    },
  });
};

export default useUserLogin;
