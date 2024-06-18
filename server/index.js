import express from 'express';
import {GenerateController} from "./controllers/GenerateController.js";

const app = express();

app.listen(8081, () => {
    console.log('The server is running on 8081 port');
});
