import Axios from "axios";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "../App.css";

function Profile() {
  const [friendsList, setFriendsList] = useState([]);
  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAdress, setNewAdress] = useState("");
  const [newBirthdate, setNewBirthdate] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newTelephone, setNewTelephone] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [isShownChange, setIsShownChange] = useState(false);
  const [isShownFriends, setIsShownFriends] = useState(false);

  const toggleFieldset = () => setIsShown(!isShown);
  const toggleFriends = () => setIsShownFriends(!isShownFriends);
  const toggleUserInfo = () => setIsShownChange(!isShownFriends);

  const getFriendsInfo = () => {
    Axios.get("http://localhost:3001/friends").then((response) => {
      console.log(response.data);
      setFriendsList(response.data);
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("email");
    localStorage.removeItem("adress");
    localStorage.removeItem("birthdate");
    localStorage.removeItem("country");
    localStorage.removeItem("telephone");
    window.location.href = "/";
  };

  const updateUserInfo = () => {
    Axios.put("http://localhost:3001/update", {
      firstname: Boolean(newFirstname)
        ? newFirstname
        : localStorage.getItem("firstname"),
      lastname: Boolean(newLastname)
        ? newLastname
        : localStorage.getItem("lastname"),
      email: Boolean(newEmail) ? newEmail : localStorage.getItem("email"),
      adress: Boolean(newAdress) ? newAdress : localStorage.getItem("adress"),
      birthdate: Boolean(newBirthdate)
        ? newBirthdate
        : localStorage.getItem("birthdate"),
      country: Boolean(newCountry)
        ? newCountry
        : localStorage.getItem("country"),
      telephone: Boolean(newTelephone)
        ? newTelephone
        : localStorage.getItem("telephone"),
      username: Boolean(newUsername)
        ? newUsername
        : localStorage.getItem("username"),
      id: localStorage.getItem("id"),
    }).then(() => {
      localStorage.setItem(
        "firstname",
        Boolean(newFirstname) ? newFirstname : localStorage.getItem("firstname")
      );
      localStorage.setItem(
        "lastname",
        Boolean(newLastname) ? newLastname : localStorage.getItem("lastname")
      );
      localStorage.setItem(
        "email",
        Boolean(newEmail) ? newEmail : localStorage.getItem("email")
      );
      localStorage.setItem(
        "adress",
        Boolean(newAdress) ? newAdress : localStorage.getItem("adress")
      );
      localStorage.setItem(
        "birthdate",
        Boolean(newBirthdate) ? newBirthdate : localStorage.getItem("birthdate")
      );
      localStorage.setItem(
        "country",
        Boolean(newCountry) ? newCountry : localStorage.getItem("country")
      );
      localStorage.setItem(
        "telephone",
        Boolean(newTelephone) ? newTelephone : localStorage.getItem("telephone")
      );
      localStorage.setItem("oldUsername", localStorage.getItem("username"));
      localStorage.setItem(
        "username",
        Boolean(newUsername) ? newUsername : localStorage.getItem("username")
      );
      if (
        localStorage.getItem("oldUsername") !== localStorage.getItem("username")
      ) {
        logout();
      }
      alert("Update success!");
      window.location.href = "/";
    });
  };

  return (
    <div className="container">
      <div className="user">
        <h1>{localStorage.getItem("username")}</h1>
        <button onClick={logout}>LogOut</button>
        <button
          onClick={() => {
            getFriendsInfo();
            toggleFriends();
          }}
        >
          Friends
        </button>
        <button
          onClick={() => {
            toggleFieldset();
            getFriendsInfo();
          }}
        >
          User info
        </button>
        <button
          onClick={() => {
            window.location.href="/messages"
          }}
        >
          Chat
        </button>
      </div>
      <div className="info">
        {isShown &&
          // eslint-disable-next-line array-callback-return
          friendsList.map((val, key) => {
            if (val.username === localStorage.getItem("username")) {
              return (
                <>
                  <h1>{val.username}</h1>
                  <div className="friendsList">
                    <div>
                      <h3>Id: {val.id}</h3>
                      <h3>Firstname: {val.firstname}</h3>
                      <h3>Lastname: {val.lastname}</h3>
                      <h3>Email: {val.email}</h3>
                      <h3>Birthdate: {val.birthdate}</h3>
                      <h3>Country: {val.country}</h3>
                      <h3>Adress: {val.adress}</h3>
                      <h3>Telephone: {val.telephone}</h3>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      toggleUserInfo();
                      toggleFieldset();
                    }}
                  >
                    Change Info
                  </button>
                </>
              );
            }
          })}
        {isShownChange &&
          // eslint-disable-next-line array-callback-return
          friendsList.map((val, key) => {
            if (val.username === localStorage.getItem("username")) {
              return (
                <>
                  <div className="friendsList">
                    <div>
                      <h3>Id: {val.id}</h3>
                      <h3>Firstname: </h3>
                      <input
                        type="text"
                        placeholder={val.firstname}
                        onChange={(event) => {
                          setNewFirstname(event.target.value);
                        }}
                      />
                      <h3>Lastname: </h3>
                      <input
                        type="text"
                        placeholder={val.lastname}
                        onChange={(event) => {
                          Boolean(event.target.value)
                            ? setNewLastname(event.target.value)
                            : setNewLastname(localStorage.getItem("lastname"));
                          setNewLastname(event.target.value);
                        }}
                      />
                      <h3>Username: </h3>
                      <input
                        type="text"
                        placeholder={val.username}
                        onChange={(event) => {
                          if (event.target.value !== null) {
                            setNewUsername(event.target.value);
                          } else {
                            setNewUsername(localStorage.getItem("username"));
                          }
                        }}
                      />
                      <h3>Email: </h3>
                      <input
                        type="text"
                        placeholder={val.email}
                        onChange={(event) => {
                          if (event.target.value !== null) {
                            setNewEmail(event.target.value);
                          } else {
                            setNewEmail(localStorage.getItem("email"));
                          }
                        }}
                      />
                      <h3>Birthdate: </h3>
                      <input
                        type="date"
                        placeholder={val.birthdate}
                        onChange={(event) => {
                          if (event.target.value !== null) {
                            setNewBirthdate(event.target.value);
                          } else {
                            setNewBirthdate(localStorage.getItem("birthdate"));
                          }
                        }}
                      />
                      <h3>Country: </h3>
                      <input
                        type="text"
                        placeholder={val.country}
                        onChange={(event) => {
                          if (event.target.value !== null) {
                            setNewCountry(event.target.value);
                          } else {
                            setNewCountry(localStorage.getItem("country"));
                          }
                        }}
                      />
                      <h3>Adress: </h3>
                      <input
                        type="text"
                        placeholder={val.adress}
                        onChange={(event) => {
                          if (event.target.value !== null) {
                            setNewAdress(event.target.value);
                          } else {
                            setNewAdress(localStorage.getItem("adress"));
                          }
                        }}
                      />
                      <h3>Telephone: </h3>
                      <input
                        type="text"
                        placeholder={val.telephone}
                        onChange={(event) => {
                          if (event.target.value !== null) {
                            setNewTelephone(event.target.value);
                          } else {
                            setNewTelephone(localStorage.getItem("telephone"));
                          }
                        }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      toggleUserInfo();
                      toggleFieldset();
                      updateUserInfo();
                    }}
                  >
                    Change Info
                  </button>
                </>
              );
            }
          })}

        {isShownFriends &&
          // eslint-disable-next-line array-callback-return
          friendsList.map((val, key) => {
            if (val.username !== localStorage.getItem("username")) {
              return (
                <>
                  <h1>{val.username}</h1>
                  <div className="friendsList">
                    <div>
                      <h3>Id: {val.id}</h3>
                      <h3>Firstname: {val.firstname}</h3>
                      <h3>Lastname: {val.lastname}</h3>
                      <h3>Email: {val.email}</h3>
                      <h3>Birthdate: {val.birthdate}</h3>
                      <h3>Country: {val.country}</h3>
                      <h3>Adress: {val.adress}</h3>
                      <h3>Telephone: {val.telephone}</h3>
                    </div>
                  </div>
                </>
              );
            }
          })}
      </div>
    </div>
  );
}

export default withRouter(Profile);
