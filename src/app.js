import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { json } from "express";


const app = express()

app.use(cookieParser())
app.use(cors({
    origin: process.env.CORS_ORIGIN
}))
app.use(json({
    limit: "16kb"
}))
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

export default app;