import React, { useState, useEffect } from "react";
import { NewPostForm } from "../forums/NewPostForm.js";
import { EditForum } from "../forums/EditForum.js";
import { CommentForm } from "../forums/CommentForm.js";
import {LoveButton} from '../forums/LoveButton';
import { useNavigate } from "react-router-dom";
import titleImage from '/Users/meganlee/workspace/blossoming-paths/src/images/Beige Brown Minimal Lettering Logo Concept.png';
import image from '/Users/meganlee/workspace/blossoming-paths/src/images/Yellow Watercolor Wild Flowers Notes A4 Document.png';
import "./Forums.css";

export const Forums = () => {
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicFilter, setTopicFilter] = useState("All");
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPosts, setNewPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [showDeleteButton,setShowDeleteButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current user from local storage
    const storedUser = JSON.parse(localStorage.getItem("blossom_user"));
    setCurrentUser(storedUser);

    // Fetch the posts from your API
fetch("http://localhost:8088/post")
.then((response) => response.json())
.then((data) => {
  const postsWithLoves = data.map((post) => ({
    ...post,
    lovedByUserIds: post.lovedByUserIds || [], // Initialize the array if not present
  }));
  setPosts(postsWithLoves);
})
.catch((error) => console.error("Error fetching posts:", error));


    // Fetch the topics from your API
    fetch("http://localhost:8088/topics")
      .then((response) => response.json())
      .then((data) => {
        setTopics(data);
      })
      .catch((error) => console.error("Error fetching topics:", error));

    // Fetch the users from your API
    fetch("http://localhost:8088/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching users:", error));

    // Fetch the comments from your API
    fetch("http://localhost:8088/comments")
      .then((response) => response.json())
      .then((data) => {
        setComments(data);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const getAuthorName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.fullName : "Unknown";
  };

  const handlePostCreation = (formData) => {
    const authorName = getAuthorName(currentUser.id);
    const newPost = {
      topic: formData.topic,
      content: formData.content,
      userId: currentUser.id,
      author: authorName,
      createdAt: new Date().toISOString()
    };

    // Save the new post to your API 
    fetch("http://localhost:8088/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewPosts((prevNewPosts) => [...prevNewPosts, data]);
        setShowNewPostModal(false);
      })
      .catch((error) => console.error("Error creating post:", error));
  };

  const handleDeletePost = (postId) => {
    // Delete the post from your API
    fetch(`http://localhost:8088/post/${postId}`, {
      method: "DELETE",
    })
      .then(() => {
        setNewPosts((prevNewPosts) =>
          prevNewPosts.filter((post) => post.id !== postId)
        );
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  const handleEditPost = (postId) => {
    const postToEdit = filteredPosts.find((post) => post.id === postId);
    setEditingPost(postToEdit);
    setShowDeleteButton(true);
  };

  const handlePostUpdate = (postId, topic, content) => {
    const updatedPost = {
      ...editingPost,
      topic,
      content,
    };

    // Update the post on your API
    fetch(`http://localhost:8088/post/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedNewPosts = newPosts.map((post) =>
          post.id === postId ? data : post
        );
        setNewPosts(updatedNewPosts);

        const updatedPosts = posts.map((post) =>
          post.id === postId ? data : post
        );
        setPosts(updatedPosts);

        setEditingPost(null);
        setShowDeleteButton(false);
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  const handleNewPostClick = () => {
    setShowNewPostModal(true);
    setEditingPost(null);
  };

  const handleTopicFilterChange = (e) => {
    setTopicFilter(e.target.value);
  };


  const handleDeleteComment = (commentId) => {
    // Delete the comment from your API
    fetch(`http://localhost:8088/comments/${commentId}`, {
      method: "DELETE",
    })
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      })
      .catch((error) => console.error("Error deleting comment:", error));
  };



  const filteredPosts =
  topicFilter === "All"
    ? [...posts, ...newPosts]
    : [...posts, ...newPosts].filter((post) => post.topic === topicFilter);

    filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
    const handleLovePost = (postId) => {
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          if (!post.lovedByUserIds) {
            post.lovedByUserIds = [];
          }
    
          const userIndex = post.lovedByUserIds.indexOf(currentUser.id);
    
          if (userIndex === -1) {
            post.lovedByUserIds.push(currentUser.id);
            post.loves = (post.loves || 0) + 1;
          } else {
            post.lovedByUserIds.splice(userIndex, 1);
            post.loves = Math.max((post.loves || 1) - 1, 0);
          }
        }
        return post;
      });
    
      setPosts(updatedPosts);
    };
    

  return (
    <div className="forums-container">
      <img className="homepage-image" src={image} alt="Login Image" />

      <img className="title-image-forums" src={titleImage} alt="Title Image" />
      {/* Drop-down topic filter */}
      <label htmlFor="topicFilter">Select a Topic:</label>
      <select id="topicFilter" value={topicFilter} onChange={handleTopicFilterChange}>
        <option value="All">All Topics</option>
        {topics.map((topic) => (
          <option key={topic.id} value={topic.subject}>
            {topic.subject}
          </option>
        ))}
      </select>
      {currentUser ? (
        <>
          {/* New Post Button */}
          <button className="post-button" onClick={handleNewPostClick}>
            New Post
          </button>

          {/* New Post Form */}
          {showNewPostModal && (
            <NewPostForm
              handlePostCreation={handlePostCreation}
              handleCancel={() => {
                setShowNewPostModal(false);
                setEditingPost(null);
              }}
              topics={topics}
              editingPost={editingPost}
              getAuthorName={getAuthorName}
              users={users}
              currentUser={currentUser}
            />
          )}

          {/* Existing Posts */}
          {filteredPosts.length > 0 ? (
            <>
              <h2>Posts</h2>
              <ul className="existing-posts">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="post-item">
                    <p className="post-creation-date">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
                        <LoveButton
  post={post} // Make sure 'post' is defined and passed as a prop
  currentUser={currentUser} // Make sure 'currentUser' is defined and passed as a prop
  handleLovePost={handleLovePost}
/>
                    {currentUser.id === post.userId && (
                      <div className="post-actions">
                        <button onClick={() => handleEditPost(post.id)}>
                          Edit
                        </button>
                        <button onClick={() => handleDeletePost(post.id)}>
                          Delete
                        </button>
                      </div>
                    )}

                    <h3>{post.topic}</h3>
                    <p className="post-author">Author: {post.author}</p>
                    <p className="post-content">{post.content}</p>

                    


                    {/* New Comment Form */}
                    <CommentForm
                      postId={post.id}
                      currentUser={currentUser}
                      getAuthorName={getAuthorName}
                      handleCancel={() => {
                        // Handle cancel for comment form here
                      }}
                      setComments={setComments}
                      handleDeleteComment={handleDeleteComment}
                    />

                    {/* Comments List */}
                    <ul className="comments-list">
                    {comments
  .filter((comment) => comment.postId === post.id)
  .map((comment) => (
    <div key={comment.id} className="comment-container">
      <p>{comment.content}</p>
      <p className="comment-author">
        Author: {comment.author}
      </p>
      <p className="comment-date">
        Created on: {new Date(comment.createdAt).toLocaleString()}
      </p>
      {currentUser.id === comment.userId && (
        <button
          onClick={() => handleDeleteComment(comment.id)}
          className="delete-comment"
        >
          Delete Comment
        </button>
      )}
    </div>
  ))}

                    </ul>

                    {/* Edit Post Form */}
                    {editingPost && editingPost.id === post.id && (
                      <div className="edit-post-form">
                        <h2>Edit Post</h2>
                        <EditForum
                          post={editingPost}
                          handlePostUpdate={handlePostUpdate}
                          topics={topics}
                          handleCancel={() => setEditingPost(null)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </ul>
            </>
          ) : (
            <p>No posts found.</p>
          )}
        </>
      ) : (
        <p>Please sign in to view and create posts.</p>
      )}
    </div>
  );
};