import { Router } from "express";
import { healthCheck } from "../controllers/healthController.js";

const router = Router();

router.route("/health").get(healthCheck);

export default router;