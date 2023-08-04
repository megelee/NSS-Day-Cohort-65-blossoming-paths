import React, { useState } from "react";

export const CommentForm = ({ postId, currentUser, getAuthorName, handleAddComment }) => {
  const [content, setContent] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);

  const handleCommentCreation = (e) => {
    e.preventDefault();
    const authorName = getAuthorName(currentUser.id);

    const newComment = {
      postId: postId,
      content: content,
      userId: currentUser.id,
      author: authorName,
    };

    // Save the new comment to your API
    fetch("http://localhost:8088/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((response) => response.json())
      .then((data) => {
        handleAddComment(postId, data);
        setContent("");
        setShowCommentBox(false); // Clear the content and hide the comment box
      })
      .catch((error) => console.error("Error creating comment:", error));
  };

  const handleCancelComment = () => {
    setShowCommentBox(false); // Hide the comment box
    setContent(""); // Clear the content
  };

  return (
    <div>
      {!showCommentBox && (
        <button className="comment-button" onClick={() => setShowCommentBox(true)}>
          Comment
        </button>
      )}
      {showCommentBox && (
        <div>
          <textarea
            className="comment-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your comment here..."
          />
          <button className="submit-comment" onClick={handleCommentCreation}>
            Submit Comment
          </button>
          <button className="cancel-comment" type="button" onClick={handleCancelComment}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
