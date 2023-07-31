import React, { useState } from "react";

export const CommentForm = ({ handleCommentCreation }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === "") return;
    handleCommentCreation({ content });
    setContent("");
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="form-buttons">
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
};

 
