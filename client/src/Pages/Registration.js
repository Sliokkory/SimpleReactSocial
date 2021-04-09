import "../App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adress, setAdress] = useState("");
  const [country, setCountry] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [telephone, setTelephone] = useState("");

  const registration = () => {
    Axios.post("http://localhost:3001/create", {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: password,
      adress: adress,
      country: country,
      birthdate: birthdate,
      telephone: telephone,
    }).then((response) => {
      console.log(response);
      alert("Вы успешно зарегистрированы");
    });
  };

  return (
    <div className="App">
      <form onSubmit={registration} className="information">
        <h1>Registration</h1>
        <label>FirstName:</label>
        <input
          type="text"
          required
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
        <label>LastName:</label>
        <input
          type="text"
          required
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
        <label>Username:</label>
        <input
          type="text"
          required
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Email:</label>
        <input
          type="email"
          required
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          required
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <label>Adress:</label>
        <input
          type="text"
          required
          onChange={(event) => {
            setAdress(event.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type="text"
          required
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label>Birthdate:</label>
        <input
          type="date"
          required
          onChange={(event) => {
            setBirthdate(event.target.value);
          }}
        />
        <label>Telephone number:</label>
        <input
          type="number"
          required
          onChange={(event) => {
            setTelephone(event.target.value);
          }}
        />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default App;
