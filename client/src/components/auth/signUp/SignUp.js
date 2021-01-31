import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './SignUp.scss';
import { registerUser } from './../../../actions/userActions';

const SignUp = () => {
  const [signupForm, setSignUpForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setSignUpForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    dispatch(registerUser(signupForm));
  };

  return (
    <div className="signIn">
      <h1 className="h-primary">SIGN UP</h1>
      <h3 className="h-subtext d-gray">
        Already have an account? Click <span className="link-blue">here.</span>
      </h3>
      <hr />
      <form onSubmit={onSubmitHandler} className="authForm">
        <div className="formgroup">
          <label htmlFor="email">Email</label>
          <input
            onChange={onChangeHandler}
            name="email"
            type="email"
            value={signupForm.email}
            required
          />
        </div>
        <div className="formgroup">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            value={signupForm.username}
            type="text"
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="formgroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={signupForm.password}
            onChange={onChangeHandler}
          />
        </div>
        <div className="formgroup">
          <label htmlFor="confirmPassword">Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={signupForm.confirmPassword}
            onChange={onChangeHandler}
          />
        </div>
        {/* <small style={{ color: 'rgb(255 90 90)', fontWeight: 'bold' }}>
          Username or password is incorrect.
        </small> */}

        <button className="blue-btn">SIGN UP</button>
      </form>
    </div>
  );
};

export default SignUp;
