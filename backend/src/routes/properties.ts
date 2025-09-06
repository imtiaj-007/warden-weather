import { Router } from "express";
import { getProperties } from "../controllers/properties";

const router = Router();

router.get("/get-properties", getProperties);

export default router;
