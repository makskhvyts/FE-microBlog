import React from 'react';
import useLikePost from '../stores/actions/posts/useLikePost';

const PostCard = ({ post }) => {
  const [hasLikedPost, setPostLikedState] = React.useState(post.is_liked);
  const { mutate: likePostMutation, isPending: isLikePostPending } =
    useLikePost(setPostLikedState);

  const likeButtonClasses = `px-6 py-2 text-white text-lg font-semibold rounded-full transition-all duration-300 w-28 ${
    hasLikedPost
      ? 'bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-l'
      : 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-l'
  }`;

  const handleLikePost = () => {
    likePostMutation({
      postId: post.id,
      authorUsername: post.author.username,
      isLiked: hasLikedPost,
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition-all flex flex-col gap-6 transform hover:scale-105">
      <h1 className="text-2xl font-bold text-gray-900">
        {post.author.username}
      </h1>
      <h2 className="text-lg text-gray-700 mt-2">{post.content}</h2>

      <div className="mt-4 flex justify-between items-center">
        <button
          className={likeButtonClasses}
          onClick={handleLikePost}
          disabled={isLikePostPending}
        >
          {hasLikedPost ? 'Unlike' : 'Like'}
        </button>
      </div>
    </div>
  );
};

export default PostCard;
