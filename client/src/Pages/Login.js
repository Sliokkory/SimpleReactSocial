import "../App.css";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const [usernamelogin, setUsernameLogin] = useState("");
  const [passwordlogin, setPasswordLogin] = useState("");

  const [loginStatus, setLoginStatus] = useState(false);

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post("http://localhost:3001/authorization", {
      username: usernamelogin,
      password: passwordlogin,
    }).then((response) => {
      if (!response.data.auth) {
        setLoginStatus(false);
        localStorage.setItem("isAuth", false);
      } else {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAuth", true);
        localStorage.setItem("id", response.data.result[0].id);
        localStorage.setItem("username", response.data.result[0].username);
        localStorage.setItem("firstname", response.data.result[0].firstname);
        localStorage.setItem("lastname", response.data.result[0].lastname);
        localStorage.setItem("email", response.data.result[0].email);
        localStorage.setItem("adress", response.data.result[0].adress);
        localStorage.setItem("birthdate", response.data.result[0].birthdate);
        localStorage.setItem("country", response.data.result[0].country);
        localStorage.setItem("telephone", response.data.result[0].telephone);
        alert("Вы вошли! Перейти в личный кабинет");
        console.log(response.data);
        setLoginStatus(true);
        window.location.href = "/";
      }
    });
  };

  const userAuthenticated = () => {
    Axios.get("http://localhost:3001/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
      console.log(loginStatus);
    });
  };

  return (
    <div className="App">
      <div className="information">
        <h1>Autorizathion</h1>
        <label>Username:</label>
        <input
          type="text"
          required
          onChange={(event) => {
            setUsernameLogin(event.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          required
          onChange={(event) => {
            setPasswordLogin(event.target.value);
          }}
        />
        <button
          onClick={() => {
            login();
            userAuthenticated();
          }}
          type="submit"
        >
          Continue
        </button>
        <Link to="/registration">
          don't have an account? create in a couple of minutes
        </Link>
      </div>
    </div>
  );
}

export default App;
