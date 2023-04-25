import express from "express"
import morgan from "morgan"
import cors from "cors"
import mongoose from "mongoose"
import { DATABASE } from "./config.js"
import authRoutes from "./routes/auth.js"
import adRoutes from "./routes/ad.js"
import * as dotenv from 'dotenv';
dotenv.config();

const app = express()

// db
mongoose.connect(DATABASE)
    .then(() => console.log("**MongoDB Connected**"))
    .catch((err) => console.log(err))

// middlewares
app.use(express.json({ limit: "10mb" })) //set limit for uploading file
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())


// routes middleware
app.use("/api", authRoutes)
app.use("/api", adRoutes)


// port
const port = process.env.PORT || 8000;

app.listen( port, () => console.log( `Server is running on port ${ port }` ) );
