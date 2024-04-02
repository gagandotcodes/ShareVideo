import { Router } from "express";
import {register} from "../controllers/userController.js"
import { upload } from "../middlewares/multer.js"

const router = Router()

router.route('/register').post(
    upload.fields([
        {
            name: 'avatar',
            maxCount: 1
        },
        {
            name: 'cover',
            maxCount: 1
        }
    ]),
    register
    )


export default router