import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ isAuth: isauth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isauth) {
          return <Component />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
