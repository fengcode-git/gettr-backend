import express from 'express'
import PostType from '../../enums/PostType'
import verifyToken from '../../middlewares/verifyToken'
import PostService from '../../services/PostService'
import { createJsonResult } from '../../utils/jsonResult'

const route = express.Router()

route.post("/insert", verifyToken, async (req, res) => {
    const { content, images, refId,postType } = req.body
    console.log(req.body)
    if (req.user) {
        try {
            let post = await PostService.add(content, req.user.id, postType, refId, images)
            res.json(createJsonResult(true, '', post))
        } catch (error) {
            res.json(createJsonResult(false, (error as Error).message, null))
        }
    } else {
        res.json(createJsonResult(false, '必须先登录账号', null))
    }
})

route.post("/getPosts", async (req, res) => {
    try {
        const { page,personId } = req.body
        let result = await PostService.getPosts(page,personId)
        res.json(createJsonResult(true, '', result))
    } catch (error) {
        res.json(createJsonResult(false, (error as Error).message, null))
    }
})

route.post('/delete', verifyToken, async (req, res) => {
    try {
        const { id } = req.body
        await PostService.delete(id)
        res.json(createJsonResult(true, '', null))
    } catch (error) {
        res.json(createJsonResult(false, (error as Error).message, null))
    }
})



export default route