import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
  });
  const navigate = useNavigate();

  const registerNewUser = () => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((createdUser) => {
        if (createdUser.hasOwnProperty("id")) {
          localStorage.setItem(
            "blossom_user",
            JSON.stringify({
              id: createdUser.id,
            })
          );

          navigate("/");
        }
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    return fetch(`http://localhost:8088/users?email=${user.email}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.length > 0) {
          // Duplicate email. No good.
          window.alert("Account with that email address already exists");
        } else {
          // Good email, create user.
          registerNewUser();
        }
      });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.name] = evt.target.value; // Use evt.target.name instead of evt.target.id
    setUser(copy);
  };

  return (
    <div>
      {/* New background image container */}
      <div className="background-image-container" />

      {/* Create Account container */}
      <main className="container--login">
        {/* Your form for creating an account */}
        <div className="title-container">
          <h1 className="title-label">Create an Account</h1>
        </div>
        <section></section>
        <form className="form--login" onSubmit={handleRegister}>
          <div className="email-container">
            <div className="">
              <label htmlFor="inputName"> Name </label>
            </div>
            <div>
              <input
                type="text"
                name="fullName" // Use name="fullName"
                value={user.fullName} // Use user.fullName
                onChange={updateUser} // Use updateUser instead of set
                className="form-control"
                placeholder="Full Name"
                required
                autoFocus
              />
            </div>
          </div>
          {/* Email input */}
          <div className="">
            <label htmlFor="inputEmail"> Email address </label>
          </div>
          <div>
            <input
              type="email"
              name="email" // Use name="email"
              value={user.email} // Use user.email
              onChange={updateUser} // Use updateUser instead of set
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
          </div>
          {/* Other form fields */}
          <button type="submit">Create Account</button>
        </form>
        <section className="link--login">
          <Link to="/login">Already have an account? Login</Link>
        </section>
      </main>
    </div>
  );
};
