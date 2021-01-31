import React from 'react';
import { Redirect } from 'react-router-dom';
import './Authpage.scss';
import test from './authbg.svg';
import SignIn from './../../components/auth/signIn/SignIn';
import SignUp from '../../components/auth/signUp/SignUp';
import { useSelector } from 'react-redux';

const Authpage = ({ location }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  if (userInfo) {
    return <Redirect to="/" />;
  }

  return (
    <div className="landingpage">
      <div className="leftCol">
        <img src={test} alt="art supplies" />
      </div>
      <div className="rightCol">
        {location.pathname === '/signup' ? <SignUp /> : <SignIn />}
      </div>
    </div>
  );
};

export default Authpage;
