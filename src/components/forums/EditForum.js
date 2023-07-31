import React, { useState } from "react";


export const EditForum = ({ post, handlePostUpdate }) => {
  const [topic, setTopic] = useState(post.topic);
  const [content, setContent] = useState(post.content);

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePostUpdate(post.id, topic, content);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="topic">Topic:</label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={handleTopicChange}
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
        />
      </div>
      <button type="submit">Update Post</button>
    </form>
  );
};


