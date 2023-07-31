// Profile.js
import React from 'react';

const Profile = () => {
  // Replace the following data with real user data fetched from the backend
  const user = {
    username: 'john_doe',
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'I love coding and exploring new technologies!',
    // Add more user profile information as needed
  };

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Bio: {user.bio}</p>
    </div>
  );
};

export default Profile;



