import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from '/Users/meganlee/workspace/blossoming-paths/src/images/Yellow Watercolor Wild Flowers Notes A4 Document.png';
import titleImage from '/Users/meganlee/workspace/blossoming-paths/src/images/Beige Brown Minimal Lettering Logo Concept.png';

import "./Login.css";

export const Login = () => {
    const [email, set] = useState("meganelee1219@gmail.com");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then((res) => res.json())
            .then((foundUsers) => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0];
                    localStorage.setItem(
                        "blossom_user",
                        JSON.stringify({
                            id: user.id,
                        })
                    );

                    navigate("/");
                } else {
                    window.alert("Invalid login");
                }
            });
    };

    return (
        <div className="container--center">
            {/* New background image container */}
            <img className="homepage-image" src={image} alt="Login Image" />
            <img className="title-image" src={titleImage} alt="Title Image" />

            {/* Login container */}
            <main className="container--login">
                {/* Title outside the form */}
                <div className="title-container">
                    {/* <h1 className="title-label-login">Blossoming Paths</h1> */}
                </div>

                <section>
                    <form className="form--login" onSubmit={handleLogin}>
                        <fieldset>
                            {/* <h1 className="font-weight-normal">Please sign in</h1> */}
                            {/* Move the email input inside the form */}
                            <div className="email-container">
                                <div className="inner-container">
                                    <div className="">
                                        <label htmlFor="inputEmail"> Email address </label>
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            id="inputEmail"
                                            value={email}
                                            onChange={(evt) => set(evt.target.value)}
                                            className="form-control"
                                            placeholder="Email address"
                                            required
                                            autoFocus
                                        />

                                    </div>
                                </div>
                            </div>
                            {/* The rest of your form elements */}
                        </fieldset>
                        <fieldset>
                            <button type="submit">Sign in</button>
                        </fieldset>
                    </form>
                </section>
                <section className="link--register">
                    <Link to="/register">Not a member yet?</Link>
                </section>
            </main>
        </div>
    );
};
