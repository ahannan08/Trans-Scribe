import express from "express"
import {getTranscripts, postTranscripts} from "../Controller/transcriptionController.js"
const router = express.Router()



router.get("/get",getTranscripts)

router.post("/post",postTranscripts)


export default router