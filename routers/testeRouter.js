import { Router } from "express";
import { getTimelineList, newRepostController } from "../controllers/repostController.js";
import { newRepostValidation } from "../middlewares/repostValidator.js";
import { testeValidation, testeValidation2, testeValidation3 } from "../middlewares/teste.js";
import {authValidator} from "./../middlewares/authValidator.js"
import { getTimelineListTeste } from "../controllers/repostControllerTest.js";

const testRouter = Router()

testRouter.get('/pageById/:id', authValidator, testeValidation2, getTimelineListTeste)
testRouter.get('/testtimelinelist', authValidator, testeValidation, getTimelineList)
testRouter.get("/hashtagT/:hashtag", authValidator, testeValidation3, getTimelineList);

export default testRouter