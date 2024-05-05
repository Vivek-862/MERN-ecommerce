import express from "express";
import {
    postDetails,getDetails
} from "../controller/vivekController.js" ;

const router = express.Router();

router.post(
    "/post-Details",
    postDetails
)
router.get(
    "/get-Details",
    getDetails
)
export default router;
