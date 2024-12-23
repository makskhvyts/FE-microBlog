const PostSchema = {
  id: '',
  author: {
    full_name: '',
    posts: 0,
    username: '',
  },
  content: '',
  likes: 0,
  is_liked: false,
  created_at: '',
};

export default PostSchema;