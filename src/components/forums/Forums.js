import React, { useState, useEffect } from "react";
import { NewPostForm } from "../forums/NewPostForm.js";
import { EditForum } from "../forums/EditForum.js";
import { CommentForm } from "../forums/CommentForm.js";
import { useNavigate } from "react-router-dom";
import "./Forums.css";

export const Forums = () => {
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [topicFilter, setTopicFilter] = useState("All");
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]); // New state to store comments
  const [currentUser, setCurrentUser] = useState(null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current user from local storage
    const storedUser = JSON.parse(localStorage.getItem("blossom_user"));
    setCurrentUser(storedUser);

    // Fetch the posts from your API
    fetch("http://localhost:8088/post")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
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
    return user ? user.name : "Unknown";
  };

  const handlePostCreation = (formData) => {
    const newPost = {
      topic: formData.topic,
      content: formData.content,
      userId: currentUser.id,
      author: getAuthorName(currentUser.id),
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
        setPosts((prevPosts) => [...prevPosts, data]);
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
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      })
      .catch((error) => console.error("Error deleting post:", error));
  };

  const handleEditPost = (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);
    setEditingPost(postToEdit);
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
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === postId ? data : post))
        );
        setEditingPost(null);
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
  const handleAddComment = (postId, comment) => {
    const newComment = {
      id: Date.now(), // This is just for demonstration, in practice, the backend will generate the comment ID
      postId,
      content: comment.content,
      userId: comment.userId,
      author: getAuthorName(comment.userId), // Include the author's name for the comment
    };
  
    // Save the new comment to local storage
    const existingComments = JSON.parse(localStorage.getItem("comments")) || [];
    const updatedComments = [...existingComments, newComment];
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  
    // Update the state with the new comment
    setComments(updatedComments);
  };
  const filteredPosts =
    topicFilter === "All" ? posts : posts.filter((post) => post.topic === topicFilter);

  return (
    <div className="forums-container">
      <h1>Forums</h1>
      {currentUser ? (
        <>
          <div>
            <label htmlFor="topicFilter">Select a Topic:</label>
            <select
              id="topicFilter"
              value={topicFilter}
              onChange={handleTopicFilterChange}
            >
              <option value="All">All Topics</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.subject}>
                  {topic.subject}
                </option>
              ))}
            </select>
          </div>
          <button className="post-button" onClick={handleNewPostClick}>
            New Post
          </button>
          {filteredPosts.length > 0 ? (
            <>
              <h2>Existing Posts</h2>
              <ul className="existing-posts">
                {filteredPosts.map((post) => (
                  <li key={post.id} className="post-item">
                    <h3>{post.topic}</h3>
                    <p>Author: {post.author}</p>
                    <p>{post.content}</p>
                    {currentUser.id === post.userId && (
                      <div>
                        <button onClick={() => handleEditPost(post.id)}>Edit</button>
                        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                      </div>
                    )}
                    <CommentForm
                      postId={post.id}
                      currentUser={currentUser}
                      handleAddComment={handleAddComment} // Pass the function to the CommentForm
                    />
                    <ul>
                      {comments.filter((comment) => comment.postId === post.id)
                        .map((comment) => (
                          <li key={comment.id}>
                            <p>{comment.content}</p>
                            <p>{comment.author}</p>
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>No posts found.</p>
          )}
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
          {editingPost && (
            <div>
              <h2>Edit Post</h2>
              <EditForum post={editingPost} handlePostUpdate={handlePostUpdate} />
            </div>
          )}
        </>
      ) : (
        <p>Please sign in to view and create posts.</p>
      )}
    </div>
  );
};
