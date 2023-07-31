import React, { useState } from "react";

export const CommentForm = ({ postId, currentUser, handleAddComment }) => {
  const [content, setContent] = useState("");

  const handleCommentCreation = (e) => {
    e.preventDefault();

    const newComment = {
      postId: postId,
      content: content,
      userId: currentUser.id,
      author: (content.userId),
    };

    fetch("http://localhost:8088/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => response.json())
      .then((data) => {
        // Call the handleAddComment function to update the comments in Forums component
        handleAddComment(postId, data);
        setContent("");
      })
      .catch((error) => console.error("Error creating comment:", error));
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your comment here..."
      />
      <button onClick={handleCommentCreation}>Submit Comment</button>
    </div>
  );
};




 
