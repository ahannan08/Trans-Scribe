import express from "express"
import { getTranslations, saveTranslation } from "../Controller/translationController.js"
const router = express.Router()




router.post("/post",saveTranslation)
router.get("/get",getTranslations)


export default router