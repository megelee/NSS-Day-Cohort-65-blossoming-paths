import React from 'react';

export const LoveButton = ({ post, currentUser, handleLovePost }) => {
    if (!post || !currentUser) {
      return null; // Return null or a loading indicator if 'post' or 'currentUser' is not defined
    }
  
    const isLovedByCurrentUser = post.lovedByUserIds.includes(currentUser.id);
  
    return (
      <button
        className={`love-button ${isLovedByCurrentUser ? 'loved' : ''}`}
        onClick={() => handleLovePost(post.id)}
      >
        <span className="heart-icon" role="img" aria-label="Love">
          {isLovedByCurrentUser ? '❤️' : '🤍'}
        </span>
        <span className="love-count">{post.loves}</span>
      </button>
    );
  };
  


