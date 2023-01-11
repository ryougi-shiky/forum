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
  const {user} = useContext(AuthContext);

  useEffect(()=>{
    const fetchPosts = async () => {
      // const res = await axios.get(`${backend_url}/users/post/profile/${username}`);
      const res = username 
        ? await axios.get(`${backend_url}/users/post/profile/${username}`)
        : await axios.get(`${backend_url}/users/post/moments/${user._id}`);
      console.log("posts: ", res.data);
      console.log("username: ", username);
      setPosts(res.data);
      // setPosts(res.data.sort((p1, p2) => {
      //   return new Date(p2.createdAt) - new Date(p1.createdAt);
      // }));
    };
    fetchPosts();
  },[username, user._id])

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts && posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
