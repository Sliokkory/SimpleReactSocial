import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Profile from "./Pages/Profile";
import Messages from "./Pages/Messages";
import Navbar from "./components/navbar";
// import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("isAuth") === "true") {
      setLoggedIn(true);
    } else {
      setLoggedIn(null);
    }
  }, []);
  return (
    <>
      {(!Boolean(localStorage.getItem("username"))) && <Navbar />}
      
      <Router>
        <Switch>
          <Route exact path="/">
            {!loggedIn ? <Redirect to="/" /> : <Profile />}
          </Route>
          {/* <Route path="/" exact component={loggedIn ? Profile : Home} /> */}
          <Route path="/registration" exact component={Registration} />
          <Route path="/login" exact component={Login} />
          <Route path="/messages" exact component={Messages} />
          <Route path="/profile" exact component={Profile} />
        </Switch>
      </Router>
    </>

    //   <Router>
    //     <Switch>
    //     <Route path="/login" component={Login} />
    //     <Route path="/registration" component={Registration} />
    //     <Route path="/profile" component={Profile} />
    //     {/* <ProtectedRoute path="/profile" component={Profile} isAuth={isAuth} /> */}
    //   </Switch>
    // </Router>
  );
}

export default App;
