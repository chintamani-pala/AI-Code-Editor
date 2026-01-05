import express from "express";
import dotenv from "dotenv";
dotenv.config({
    path: ".env"
});
import codeRouter from "./routes/code.router.js";
import cors from "cors";

const app = express();

app.use(express.json());


app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? JSON.parse(process.env.ALLOWED_ORIGINS) : "*",
    credentials: true
}))
app.use("/health", (req, res) => {
    res.json({
        status: "Ok"
    });
})
app.use("/api/code", codeRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${process.env.PORT || 3000}`);
});