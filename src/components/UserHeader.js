import React, { useReducer } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import useCreatePostMutation from '../stores/actions/posts/usePostCreation';
import useUserPosts from '../hooks/useUserPosts';
import useUserAuth from '../hooks/useUserAuth';

const initialState = {
  isCreatingPost: false,
  postContent: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_INPUT_VALUE':
      return { ...state, postContent: action.payload };
    case 'TOGGLE_POSTING':
      return { ...state, isCreatingPost: !state.isCreatingPost };
    case 'RESET_INPUT':
      return { ...state, postContent: '' };
    default:
      return state;
  }
}

const UserHeader = ({ children }) => {
  const [{ isCreatingPost, postContent }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { isLoggedIn, username, logout } = useUserAuth();
  const [, setSearchParams] = useSearchParams();
  const { refetch } = useUserPosts(username);
  const { mutate: createPostMutation } = useCreatePostMutation(refetch);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ username: postContent });
    dispatch({ type: 'RESET_INPUT' });
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ username });
    createPostMutation({ content: postContent });
    dispatch({ type: 'RESET_INPUT' });
    dispatch({ type: 'TOGGLE_POSTING' });
  };

  return (
    <div className="p-8 bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl shadow-xl">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative w-full max-w-md">
          <div className="flex justify-between items-center">
            <div className="text-3xl text-white font-bold">
              {username}'s Posts
            </div>
            <button
              onClick={logout}
              className="bg-white text-indigo-600 px-6 py-3 rounded-full hover:bg-indigo-700 hover:text-white transition duration-300"
            >
              Log Out
            </button>
          </div>

          <div className="flex flex-col items-center mt-6">
            <input
              value={postContent}
              onChange={(e) =>
                dispatch({ type: 'SET_INPUT_VALUE', payload: e.target.value })
              }
              type="text"
              className="w-full px-6 py-3 mb-4 border-2 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
              placeholder={
                isCreatingPost
                  ? 'Share your thoughts...'
                  : 'Search by username...'
              }
            />
            <div className="flex gap-4 w-full justify-center">
              <button
                type="submit"
                className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full transition duration-300 hover:bg-indigo-600 hover:text-white w-1/3"
                onClick={isCreatingPost ? handlePostSubmit : handleSearchSubmit}
              >
                {isCreatingPost ? 'Post' : 'Search'}
              </button>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_POSTING' })}
                className="text-white font-semibold px-6 py-3 rounded-full transition duration-300 hover:bg-indigo-600 hover:text-white border-2 border-transparent w-1/3"
              >
                Toggle to {isCreatingPost ? 'Search' : 'Post'} Mode
              </button>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default UserHeader;
