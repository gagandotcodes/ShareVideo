import { Router } from "express";
import usercontroller from "../controllers/userController.js";
import { upload } from "../middlewares/multer.js";
import { verifyJwt } from "../middlewares/authMiddleware.js";

const router = Router();

// register users
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

// get all users
router.route("/getUsers").get(usercontroller.getUsers);


router.route("/login").post(usercontroller.login);
router.route("/logout").post( verifyJwt, usercontroller.logout);

export default router;
