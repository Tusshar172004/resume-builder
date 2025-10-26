import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// db connection
await connectDB()

app.use(express.json())
app.use(cors())

// API routes
app.use('/api/users', userRouter)
app.use('/api/resumes', resumeRouter)
app.use('/api/ai', aiRouter)

// Health check
app.get('/', (req, res) => res.send("Server is live..."))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
