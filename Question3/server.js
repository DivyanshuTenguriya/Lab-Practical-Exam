import express from "express";
import studentRoute from "./src/routes/studentRoute.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Web");
});

app.use("/students", studentRoute);

app.listen(port, () => {
  console.log("Server is running on 3000");
});
