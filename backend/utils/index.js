import express from "express";
import testVivek from "./routes/testVivek.js";

const app = express();


app.use("/api/v1",testVivek);

app.listen(8989, () => {
    console.log("Server is Listening on port 9090");
  });

console.log("heloo");