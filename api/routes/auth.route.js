import express from "express";
import {
  signin,
  signup,
  google,
  signout,
  checkUsername,
  checkEmail,
} from "../controllers/auth.controller.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signout);
router.post("/check-username", checkUsername);
router.post("/check-email", checkEmail);
export default router;
