import React, { useState } from "react";
import "./Forums.css";
export const EditForum = ({ post, handlePostUpdate, topics, handleCancel }) => {
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
        <select
          id="topic"
          value={topic}
          onChange={handleTopicChange}
        >
          <option value="">Select a topic...</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.subject}>
              {topic.subject}
            </option>
          ))}
        </select>
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
      <button type="button" onClick={handleCancel}>
          Cancel
        </button>
    </form>
  );
};


