import express, { Router } from "express";
import PersonService from "../../services/PersonService";
import { createJsonResult } from "../../utils/jsonResult";

const router = express.Router()

router.post('/register', async (req, res) => {
    const { username, password } = req.body
    try {
        await PersonService.register(username,password)
        res.json(createJsonResult(true, '', null))
    } catch (e) {
        res.json(createJsonResult(false, (e as Error).message, null))
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    try {
        let result = await PersonService.login(username, password)
        res.json(createJsonResult(true, '', result))
    } catch (e) {
        res.json(createJsonResult(false, (e as Error).message, null))
    }
})

router.post('/')

export default router