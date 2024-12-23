import React from "react";
import { useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import useUserPosts from "../hooks/useUserPosts";
import useUserAuth from "../hooks/useUserAuth";

const PostsList = () => {
  const [searchQueryParams] = useSearchParams();
  const searchedUsername = searchQueryParams.get("username");
  const { username } = useUserAuth();
  const { data: postsData, isLoading: isPostsLoading, isError: hasPostsError } = useUserPosts(
    searchedUsername || username
  );

  return (
    <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          {searchedUsername ? `${searchedUsername}'s Posts` : "Your Posts"}
        </h2>

        {isPostsLoading && (
          <div className="text-center text-lg text-blue-500 animate-pulse">Loading...</div>
        )}
        {hasPostsError && (
          <div className="text-center text-lg text-red-600 font-semibold">No user found</div>
        )}
        {postsData?.length === 0 && (
          <div className="text-center text-lg text-gray-500">No posts found</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {postsData?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostsList;
