const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "./public")));
app.use(
  "/@tweenjs/tween.js",
  express.static("./node_modules/@tweenjs/tween.js")
);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:${3000}`);
});
