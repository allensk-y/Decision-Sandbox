import express from "express";
import { simulate } from "../controllers/simulate.controller.js";

const router = express.Router();

router.post("/", simulate);

export default router;
