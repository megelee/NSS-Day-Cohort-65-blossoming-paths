// ApplicationViews.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import image from '/Users/meganlee/workspace/blossoming-paths/src/images/loginImage.png';
import Profile from '../profile/Profile';
import "./ApplicationViews.css"
import { Forums } from "../forums/Forums";
import { NewPostForm } from '../forums/NewPostForm.js';
import { EditForum } from '../forums/EditForum.js';
import { CommentForm } from '../forums/CommentForm.js';
import { Comment } from '../forums/Comment.js';

const text =
  "Blossoming Paths is designed to provide vital support and connection during the fertility journey. There are a lot of challenges faced by individuals and families struggling with infertility, postpartum depression, and pregnancy-related concerns. Blossoming Paths aims to bridge the gap between those experiencing similar struggles, fostering a compassionate community that offers understanding, encouragement, and empowerment.";

const Home = () => {
  return (
    <div className="homepage-container">
      <h1 className="title--home">Blossoming Paths</h1>
      <img className="homepage-image" src={image} alt="Login Image" />
      <p className="text">"{text}"</p>
    </div>
  );
};

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forums" element={<Forums />} />
      <Route path="/forums" element={<NewPostForm />} />
      <Route path="/forums" element={<EditForum />} />
      <Route path="/forums" element={<Comment />} />
      <Route path="/forums" element={<CommentForm />} />
    </Routes>
  );
};
