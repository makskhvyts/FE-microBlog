import { useMutation } from '@tanstack/react-query';
import useApiRequest from '../../../hooks/useApiRequest';
import useUserAuth from '../../../hooks/useUserAuth';

const usePostCreation = (refetchPosts) => {
  const axios = useApiRequest();
  const { username } = useUserAuth();

  const createPost = async (content) => {
    const { data } = await axios.post(`users/${username}/posts`, { content });
    return data;
  };

  return useMutation({
    mutationKey: ['newPost'],
    mutationFn: ({ content }) => createPost(content),
    onSuccess: () => {
      refetchPosts();
    },
  });
};

export default usePostCreation;
