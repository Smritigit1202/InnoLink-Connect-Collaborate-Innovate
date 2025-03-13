import SinglePost from "./singlePost";
import { useState, useEffect, useCallback } from "react";
import {
  getAllPostsAPI,
  getAllRecomendedAPI,
  getUsersStoryAPI,
  putLikePost,
  getPost,
  getDirectMessages,
  getUsers,
  getUserProfile,
  saveUser,
  getRecentSearchesApi
} from '../../API';

// Example Usage
const fetchPosts = async () => {
  try {
    const response = await getAllPostsAPI();
    console.log("Posts Data:", response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

fetchPosts();


const Posts = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(
    () =>
      getAllPostsAPI()
        .then((res) => {
          setPosts(res.data);
        })
        .catch((error) => {
          setPosts([]);
        }),
    [posts]
  );
  useEffect(() => {
    console.log("get posts");
    getPosts();
  }, []);
  return (
    <>
      {posts.map((post) => (
        <SinglePost post={post} key={post.id} />
      ))}
    </>
  );
};

export default Posts;
