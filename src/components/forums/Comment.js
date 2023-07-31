import React from "react";
import "./Forums.css";

export const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <p>{comment.content}</p>
      <p>Comment by: {comment.author}</p>
    </div>
  );
};
