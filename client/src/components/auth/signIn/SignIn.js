import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './SignIn.scss';
import { loginUser } from './../../../actions/userActions';

const SignIn = () => {
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(userDetails));
  };

  return (
    <div className="signIn">
      <h1 className="h-primary">SIGN IN</h1>
      <h3 className="h-subtext d-gray">
        Don't have an account? Sign up <span className="link-blue">here.</span>
      </h3>
      <hr />
      <form onSubmit={onSubmitHandler} className="authForm">
        <div className="formgroup">
          <label htmlFor="username">Email</label>
          <input
            name="email"
            value={userDetails.email}
            type="email"
            onChange={onChangeHandler}
          />
        </div>
        <div className="formgroup">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            value={userDetails.password}
            type="password"
            onChange={onChangeHandler}
          />
        </div>
        {/* <small style={{ color: 'rgb(255 90 90)', fontWeight: 'bold' }}>
          Username or password is incorrect.
        </small> */}

        <button className="blue-btn">SIGN IN</button>
      </form>
    </div>
  );
};

export default SignIn;
