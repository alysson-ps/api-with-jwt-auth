import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

if(!!!process.env.JWT_SECRET){
  console.log("Use yarn generate:key for generate a key jwt");
}

const app = express();
import route from "./routes/routes";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(route);

app.listen(3333, () => {
  console.log("Run in http://localhost:3333")
  console.log("Environment:", process.env.NODE_ENV);
  console.log("JWT_KEY:", !!process.env.JWT_SECRET);
  console.log("Server started");
});
