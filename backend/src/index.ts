import express from "express"
import cors from "cors"
import { PublicHandler } from "./Public/index";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/public", PublicHandler);

app.listen(4000, () => {
    console.log("Server running at port 4000");
});