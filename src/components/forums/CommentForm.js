import React, { useState } from "react";


export const CommentForm = ({ postId, currentUser, getAuthorName, handleAddComment, handleDeleteComment, setComments }) => {
  const [content, setContent] = useState("");


  const handleCommentCreation = (e) => {
    e.preventDefault();
    const authorName = getAuthorName(currentUser.id);
    
    const newComment = {

      postId: postId,
      content: content,
      userId: currentUser.id,
      author: authorName,
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
        // handleAddComment(postId, data);
        setComments((prevComments) => [...prevComments, data]);
        setContent("");
        e.preventDefault();
      })
      .catch((error) => console.error("Error creating comment:", error));
  };

  const handleCommentDeletion = (commentId) => {
    // Implement the logic to delete the comment (e.g., make an API call)
    fetch(`http://localhost:8088/comments/${commentId}`, {
      method: "DELETE",
    })
      .then(() => {
        // Call the handleDeleteComment function to update the comments in Forums component
        handleDeleteComment(commentId);
      })
      .catch((error) => console.error("Error deleting comment:", error));
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


 
