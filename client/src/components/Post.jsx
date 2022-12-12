import React from 'react';
import "./css/post.css";
import { MoreVert } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AddCommentIcon from '@mui/icons-material/AddComment';

export default function Post() {
  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className='postProfileImg' src='/assets/img/2018-03-11 224009.jpg' alt='' />
            <span className="postUsername">Shin</span>
            <span className="postDate">2022/12/12</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">
            first post
          </span>
          <img className='postImg' src='assets/img/2018-04-16 144330.jpg' alt='' />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <ThumbUpOffAltIcon className='likeIcon'/>
            <FavoriteBorderIcon className='likeIcon'/>
            <span className="postLikeCounter">32</span>
          </div>
          <div className="postBottomRight">
            <AddCommentIcon />
            <span className="postCommentText">9</span>
          </div>
        </div>
      </div>
    </div>
  )
}
