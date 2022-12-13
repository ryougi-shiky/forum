import React, { useState } from 'react';
import "./post.css";
import { MoreVert } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AddCommentIcon from '@mui/icons-material/AddComment';

import {Users} from "../../dummyData";

export default function Post({post}) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = () => {
    setLike(isLiked ? like-1 : like+1);
    setIsLiked(!isLiked);
  }

  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className='postProfileImg' src={Users.filter((u) => u.id === post.userId)[0].profilePicture} alt='' />
            <span className="postUsername">
              {Users.filter((u) => u.id === post.userId)[0].username}
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">
            {post?.desc}
          </span>
          <img className='postImg' src={post.photo} alt='' />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img src="/assets/icon/like.png" alt="" className="likeIcon" onClick={likeHandler} />
            <img src="/assets/icon/heart.png" alt="" className="likeIcon" onClick={likeHandler} />
            <span className="postLikeCounter">{like} Likes</span>
          </div>
          <div className="postBottomRight">
            <AddCommentIcon />
            <span className="postCommentText">{post.comment} Comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}
