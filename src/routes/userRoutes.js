import { Router } from "express";
import usercontroller from "../controllers/userController.js";
import { upload } from "../middlewares/multer.js";

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

// get all users
router.route("/login").post(usercontroller.login);

export default router;
