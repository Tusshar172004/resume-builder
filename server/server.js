import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
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

// Serve frontend build (React SPA)
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, '../frontend/build')))

// Catch-all route to serve index.html for React Router
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'))
})

// Health check
app.get('/', (req, res) => res.send("Server is live..."))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
