import React, { useState } from "react";
import "./Forums.css";
export const NewPostForm = ({ handlePostCreation, handleCancel, topics, currentUser }) => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const formData = {
      topic: selectedTopic,
      content,
    };
    handlePostCreation(formData);
  };

  return (
    <form className="post-form">
      <h2>New Post</h2>
      <div className="form-group">
        <label htmlFor="topic">Topic</label>
        <select
          id="topic"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value="">Select a topic...</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.subject}>
              {topic.subject}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      {currentUser ? <p>Author: {currentUser.name}</p> : null}
      <div className="post-button">
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};



