import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import { zipDialog } from './zipDialog.js';
import { resolve } from 'node:path';

dotenv.config();

const APP_PORT = process.env.APP_PORT;

const application = express();
application.use(cors());

const upload = multer({ dest: './temp' })

application.post('/generate', upload.single('data'), async (req, res) => {
    if(await zipDialog(req.file.path) === false) {
        res.send({
            error: 'Something went wrong'
        });
    } else {
        res.sendFile(resolve(req.file.path + '.zip'))
    }
});

application.listen(APP_PORT, () => {
    console.log(`Application is running on ${APP_PORT} port`);
});