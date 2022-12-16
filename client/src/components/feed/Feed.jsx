import React, { useEffect, useState } from "react";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
// import { Posts } from "../../dummyData";
import axios from "axios";


export default function Feed() {
  const [posts, setPosts] = useState([null]);

  useEffect(()=>{
    const fetchPosts = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/post/moments/6391d5fee2d85e041ac1f910`);
      console.log(res);
    };
    fetchPosts();
  },[])

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {/* {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))} */}
      </div>
    </div>
  );
}
