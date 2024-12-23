import { useQuery } from "@tanstack/react-query";
import useApiRequest from "./useApiRequest";

const fetchPosts = async (axios, username) => {
  const response = await axios.get(`/users/${username}/posts`);
  return response.data;
};

const useUserPosts = (username) => {
  const axios = useApiRequest();

  const query = useQuery({
    queryKey: ["posts", username],
    queryFn: () => fetchPosts(axios, username),
    retry: false,
    enabled: Boolean(username),
  });

  return query;
};

export default useUserPosts;