import React from 'react'
import "./Comment.scss"
import { FcLikePlaceholder } from "react-icons/fc";
import { RxDividerHorizontal } from "react-icons/rx";

const Comment = () => {
  return (
      <div className='userComment'>
          <div>
              <div className="avator"></div>
              <h4>Suraj Chaudhary</h4>
          </div>
          <div className='desc'>
              <p>Can you give me your number</p>
              <button>    <FcLikePlaceholder /> 10likes</button>
          </div>
          <div className="view">
              <RxDividerHorizontal />
              <p>View 5 replies</p>

          </div>
     
    </div>
  )
}

export default Comment
