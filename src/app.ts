import express, { Express } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import roleRoutes from "./routes/roleRoutes";
import permissionRoutes from "./routes/permissionRoutes";
import cors from "cors";
dotenv.config();

const app: Express = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", permissionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
