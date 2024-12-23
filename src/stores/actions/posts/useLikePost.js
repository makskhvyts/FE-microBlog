import { useMutation } from '@tanstack/react-query';
import useApiRequest from '../../../hooks/useApiRequest';

const useLikePost = (setIsLiked) => {
  const axios = useApiRequest();

  const likePost = async ({ postId, authorUsername }) => {
    const { data } = await axios.put(
      `users/${authorUsername}/posts/${postId}/like`
    );
    return data;
  };

  const unlikePost = async ({ postId, authorUsername }) => {
    const { data } = await axios.delete(
      `users/${authorUsername}/posts/${postId}/like`
    );
    return data;
  };

  return useMutation({
    mutationKey: ['like'],
    mutationFn: async ({ postId, authorUsername, isLiked }) => {
      return isLiked
        ? await unlikePost({ postId, authorUsername })
        : await likePost({ postId, authorUsername });
    },
    onSuccess: (_, variables) => {
      setIsLiked(!variables.isLiked);
    },
  });
};

export default useLikePost;
