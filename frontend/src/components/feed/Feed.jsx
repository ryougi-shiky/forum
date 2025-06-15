import React, { useContext, useEffect, useState } from "react";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";
import { validateProfilePage } from "../../regex/validateUrl";

const backend_url = process.env.REACT_APP_BACKEND_URL;

export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = username 
        ? await axios.get(`${backend_url}/users/post/profile/${username}`)
        : await axios.get(`${backend_url}/users/post/allposts`);
      
      if (res.data && Array.isArray(res.data)) {
        // Sort the posts in descending order by 'createdAt' (latest first)
        const sortedPosts = res.data
          .filter(post => post && post._id) // Filter out any null or invalid posts
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setPosts(sortedPosts);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load posts");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [username, user?._id]);

  // When delete a post, let the feed to filter the deleted post in the displayed posts.
  const handlePostDelete = (postId) => {
    if (!postId) return;
    setPosts(prevPosts => prevPosts.filter(post => post && post._id !== postId));
  };

  // When create a new post, notify the frontend to refresh the page once.
  const handlePostCreate = () => {
    fetchPosts();
  };
  
  return (
    <div className="feed">
      <div className="feedWrapper">
        {user && (!username || username === user.username) && (
          <Share onPostCreate={handlePostCreate} />
        )}
        
        {loading ? (
          <div className="feedLoading">Loading posts...</div>
        ) : error ? (
          <div className="feedError">{error}</div>
        ) : posts.length === 0 ? (
          <div className="feedEmpty">No posts to display</div>
        ) : (
          posts.map((p) => (
            p && p._id ? (
              <Post key={p._id} post={p} onPostDelete={handlePostDelete} />
            ) : null
          ))
        )}
      </div>
    </div>
  );
}
