import { Router } from "express";
import usercontroller from "../controllers/userController.js";
import { upload } from "../middlewares/multer.js";
import { verifyJwt } from "../middlewares/authMiddleware.js";

const router = Router();

// Register users
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "cover",
      maxCount: 1,
    },
  ]),
  usercontroller.register
);
// Get all users
router.route("/getUsers").get(usercontroller.getUsers);
// User login
router.route("/login").post(usercontroller.login);
// User logout
router.route("/logout").post( verifyJwt, usercontroller.logout);
// Refresh access token
router.route("/refresh-access-token").post( usercontroller.refreshAccessToken);
// Change password
router.route("/change-password").patch( verifyJwt,usercontroller.changePassword);

export default router;
