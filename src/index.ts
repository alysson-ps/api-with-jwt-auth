import express from "express";
import cors from "cors";

const app = express();
import route from "./routes/routes";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(route);

app.listen(3333, () => {
  console.log("Server started");
});
