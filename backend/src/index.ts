import "dotenv/config";
import express from "express";
import cors from "cors";

import propertyRoutes from "./routes/properties";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true
}))

app.get("/", (_req, res) => res.send("Warden Weather Test: OK"));
app.use("/", propertyRoutes);

app.listen(port, () => console.log(`Server on http://localhost:${port}`));
