import React, { useEffect, useState } from "react";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";


export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const backend_url = process.env.REACT_APP_BACKEND_URL;

  useEffect(()=>{
    const fetchPosts = async () => {
      // const res = await axios.get(`${backend_url}/users/post/profile/${username}`);
      const res = username 
        ? await axios.get(`${backend_url}/users/post/profile/${username}`)
        : await axios.get(`${backend_url}/users/post/moments/6391d5fee2d85e041ac1f910`);
      console.log("posts: ", res.data);
      console.log("username: ", username);
      setPosts(res.data);
    };
    fetchPosts();
  },[])

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts && posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
