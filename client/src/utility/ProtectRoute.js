import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectRoute = ({ component: Component, ...rest }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userInfo && userInfo._id) {
          return <Component />;
        } else {
          return <Redirect to={{ pathname: '/signin' }} />;
        }
      }}
    />
  );
};

export default ProtectRoute;
