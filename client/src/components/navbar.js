import React, { useEffect, useState } from "react";
import "../App.css";

function App() {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      setIsAuth(true);
    } else {
      setIsAuth(null);
    }
  }, []);

  return (
    <div className="container">
      <div className="headerButtons">
        {isAuth ? (
          <>
            <a href="/profile">
              <button>Profile</button>
            </a>
          </>
        ) : (
          <>
            <a href={"/registration"}>
              <button>Registration</button>
            </a>
            <a href={"/login"}>
              <button>Login</button>
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
