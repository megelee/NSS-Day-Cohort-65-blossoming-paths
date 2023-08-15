// ApplicationViews.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import image from '/Users/meganlee/workspace/blossoming-paths/src/images/Yellow Watercolor Wild Flowers Notes A4 Document.png';
import "./ApplicationViews.css"
import { Forums } from "../forums/Forums";
import { NewPostForm } from '../forums/NewPostForm.js';
import { EditForum } from '../forums/EditForum.js';
import { CommentForm } from '../forums/CommentForm.js';
import titleImage from '/Users/meganlee/workspace/blossoming-paths/src/images/Beige Brown Minimal Lettering Logo Concept.png';
import { LoveButton } from '../forums/LoveButton.js';

// import secondImage from '/Users/meganlee/workspace/blossoming-paths/src/images/Untitled design (2) copy.png'

const text =
  "Blossoming Paths is designed to provide vital support and connection during the fertility journey. There are a lot of challenges faced by individuals and families struggling with infertility, postpartum depression, and pregnancy-related concerns. Blossoming Paths aims to bridge the gap between those experiencing similar struggles, fostering a compassionate community that offers understanding, encouragement, and empowerment.";

const Home = () => {
  return (
    <div className="homepage">
                  <img className="title-image" src={titleImage} alt="Title Image" />

      <div>

      {/* <h1 className="title--home">Blossoming Paths</h1> */}
      </div>
      <div>

      <img className="homepage-image" src={image} alt="Login Image" />
      </div>
    <div className="homepage-container">
      <p className="text">"{text}"</p>
      {/* <img className="second-image" src={secondImage} alt="Second Image" /> */}
    </div>
    </div>
  );
};

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forums" element={<Forums />} />
      <Route path="/forums" element={<NewPostForm />} />
      <Route path="/forums" element={<EditForum />} />
      <Route path="/forums" element={<CommentForm />} />
      <Route path="/forums" element={<LoveButton />} />
    </Routes>
  );
};
