const express = require("express");
const app = express();
const mysql = require("mysql");

const cors = require("cors");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const session = require("express-session");

const socket = require("socket.io");
const server = app.listen(3001, (req, res) => {
  console.log("Yey, youre server is running in port 3001");
});

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "hugesecretword",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee",
});

app.post("/create", (req, res) => {
  console.log(req.body);
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const adress = req.body.adress;
  const country = req.body.country;
  const birthdate = req.body.birthdate;
  const telephone = req.body.telephone;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO user (firstname, lastname, username, email, adress, country, password, birthdate, telephone) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        firstname,
        lastname,
        username,
        email,
        adress,
        country,
        hash,
        birthdate,
        telephone,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    res.send("We need a token, please give it to us next time!");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "U failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

app.get("/isUserAuth", verifyJWT, (req, res) => {
  res.send("U are authenticated Congrats!");
});

app.get("/authorization", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/authorization", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length !== 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            const id = result[0].id;
            const token = jwt.sign({ id }, "jwtSecret", {
              expiresIn: 300,
            });
            const username = result[0].username;
            console.log(username);
            req.session.user = result;
            // console.log(req.session.user);
            res.json({
              auth: true,
              token: token,
              username: username,
              result: result,
            });
          } else {
            res.json({
              auth: false,
              message: "Wrong username/password combination!",
            });
          }
        });
      } else {
        res.json({ auth: false, message: "No user exists" });
      }
    }
  );
});

app.get("/friends", (req, res) => {
  db.query("SELECT * FROM user", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const adress = req.body.adress;
  const birthdate = req.body.birthdate;
  const country = req.body.country;
  const telephone = req.body.telephone;
  const username = req.body.username;

  db.query(
    "UPDATE user SET firstname = ?, lastname = ?, email = ?, adress = ?, birthdate = ?, country = ?, telephone = ?, username = ? WHERE id = ?",
    [firstname, lastname, email, adress, birthdate,country,telephone, username, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("join_room", (data) => {
    socket.join(data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data.content);
  });
  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
  });
});

// app.listen(3001, () => {
//   console.log("Yey, youre server is running in port 3001");
// });
