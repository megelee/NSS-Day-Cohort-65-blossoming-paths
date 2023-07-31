import React, { useState, useEffect } from "react";
import { NewPostForm } from "../forums/NewPostForm.js";
import { EditForum } from "../forums/EditForum.js";
import { useNavigate } from "react-router-dom";
import "./Forums.css";

export const Forums = () => {
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current user from local storage (you can replace this with your authentication logic)
    const storedUser = JSON.parse(localStorage.getItem("blossom_user"));
    setCurrentUser(storedUser);

    // Fetch the posts from your API (you can replace this with your API fetch logic)
    fetch("http://localhost:8088/post")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => console.error("Error fetching posts:", error));

    // Fetch the topics from your API (you can replace this with your API fetch logic)
    fetch("http://localhost:8088/topics")
      .then((response) => response.json())
      .then((data) => {
        setTopics(data);
      })
      .catch((error) => console.error("Error fetching topics:", error));

    // Fetch the users from your API (you can replace this with your API fetch logic)
    fetch("http://localhost:8088/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching users:", error));
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

    // Save the new post to your API (you can replace this with your API post logic)
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
    // Delete the post from your API (you can replace this with your API delete logic)
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

    // Update the post on your API (you can replace this with your API update logic)
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

  return (
    <div className="forums-container">
      <h1>Forums</h1>
      {currentUser ? (
        <>
          <button className="post-button" onClick={handleNewPostClick}>
            New Post
          </button>
          {posts.length > 0 ? (
            <>
              <h2>Existing Posts</h2>
              <ul className="existing-posts">
                {posts.map((post) => (
                  <li key={post.id} className="post-item">
                    <h3>{post.topic}</h3>
                    <p>Author: {post.author}</p>
                    <p>{post.content}</p>
                    {currentUser.id === post.userId && (
                      <div>
                        <button onClick={() => handleEditPost(post.id)}>
                          Edit
                        </button>
                        <button onClick={() => handleDeletePost(post.id)}>
                          Delete
                        </button>
                      </div>
                    )}
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
              getAuthorName={getAuthorName} // Pass the getAuthorName function to the NewPostForm component
              users={users} // Pass the users array to the NewPostForm component
              currentUser={currentUser} // Pass the currentUser object to the NewPostForm component
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
