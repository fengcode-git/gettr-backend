import express from "express";
import formidable from "formidable";
import path from "path";
import * as fs from "fs";
import StringHelper from "../../utils/StringHelper";
import appRoot from 'app-root-path'
import { createJsonResult } from "../../utils/jsonResult";
import verifyToken from "../../middlewares/verifyToken";

const router = express.Router()

router.post('/upload',verifyToken,  (req, res) => {
    const form = new formidable.IncomingForm()
    form.parse(req, ((err, fields, files) => {
        let file = files['file'] as formidable.File
        const oldPath = file.path
        const extension = path.extname(file.name as string)
        const newFileName = (StringHelper.generateUUID() + extension).toLowerCase()
        const catalogPath = path.join(appRoot.path, '/public/uploads')
        if (!fs.existsSync(catalogPath)){
            fs.mkdirSync(catalogPath);
        }
        const newFilePath = catalogPath + '/' + newFileName
        const rawData = fs.readFileSync(oldPath)
        fs.writeFile(newFilePath, rawData, function (err) {
            if (err) {
                return res.json(createJsonResult(false,err.message,''))
            }
            return res.json(createJsonResult(true,'',`/uploads/${newFileName}`))
        })
    }))
})
export default router