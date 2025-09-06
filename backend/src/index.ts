import "dotenv/config";
import express from "express";

import propertyRoutes from "./routes/properties";

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (_req, res) => res.send("Warden Weather Test: OK"));
app.use("/", propertyRoutes);

app.listen(port, () => console.log(`Server on http://localhost:${port}`));
