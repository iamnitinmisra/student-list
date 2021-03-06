const express = require("express");
const path = require("path");
// require rollbar below

// create the Rollbar class below

const app = express();
app.use(express.json());

let studentList = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
  // send rollbar some info
});

app.post("/api/student", (req, res) => {
  let { name } = req.body;
  name = name.trim();

  const index = studentList.findIndex((studentName) => {
    return studentName === name;
  });

  const myName = "Nitin";

  if (index === -1 && name !== "") {
    studentList.push(name);
    // add rollbar log here

    res.status(200).send(studentList);
  } else if (name === "") {
    // add a rollbar error here

    res.status(400).send({ error: "no name was provided" });
  } else {
    // add a rollbar error here too

    res.status(400).send({ error: "that student already exists" });
  }
});

const port = process.env.PORT || 4545;

// add rollbar errorHandler middleware here

app.listen(port, () => console.log(`server running on port ${port}`));
