// Profile.js
import React from 'react';
import './Profile.css'

export const Profile = () => {
  // Replace the following data with real user data fetched from the backend
  const user = {
    username: 'john_doe',
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'I love coding and exploring new technologies!',
    // Add more user profile information as needed
  };

  return (
    <div className="profile-container">
      <h1 className="profile-heading">{user.name}'s Profile</h1>
      <p className="profile-details">Email: {user.email}</p>
      <p className="profile-details">Bio: {user.bio}</p>
      {/* Add more user profile information as needed */}
    </div>
  );
};





