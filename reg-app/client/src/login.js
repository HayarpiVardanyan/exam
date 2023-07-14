import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Login = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUserFromDatabase();
  }, []);

  const fetchUserFromDatabase = () => {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.log(error));
  };

  const errors = {
    uname: "Invalid username",
    pass: "Invalid password"
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { uname, pass } = event.target.elements;

    if (userData.length === 0) {
      setErrorMessages({ uname: errors.uname });
      return;
    }

    const matchedUser = userData.find((user) => user.username === uname.value);

    if (matchedUser) {
      if (matchedUser.password !== pass.value) {
        setErrorMessages({ pass: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      setErrorMessages({ uname: errors.uname , pass : '' });
    }
  };

  const renderErrorMessage = (name) =>
    errorMessages[name] && 
      <div className="error">{errorMessages[name]}</div>;

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input type="text" name="uname" placeholder='UserName' required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <input type="password" name="pass" placeholder='Password' required />
          {renderErrorMessage("pass")}
        </div>
        <div class="lgn-btn">
          <Link to='/form'>
            <button type="button">Login</button>
          </Link>
        </div>
        <div class="reg-btn">
          <Link to='/registration'>
            <h3>Register Now</h3>
          </Link>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Login</div>
        {isSubmitted ? (
          <div>User is successfully logged in</div>
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
}

export default Login;




/*import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import profile from "../src/images/person-circle.svg";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log('Login submitted');
  };
  return (
  <p class="round">
    <div className='container-image'>
      <img src={profile} alt='profile' className='profile'/>
    </div>
    <div class='login'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
          <input
            type="text" value={username} placeholder='UserName' onChange={handleUsernameChange}/>
        <br />
          <input type="password" placeholder='Password' value={password} onChange={handlePasswordChange}/>
        <br />

        <div class="lgn-btn">
          <Link to='/home'>
            <button type="button">Login</button>
          </Link>
        </div>

        <div class="reg-btn">
          <Link to='/registration'>
            <h3>Register Now</h3>
          </Link>
        </div>
      </form>
    </div>
  </p>
  );
};

export default Login;*/

