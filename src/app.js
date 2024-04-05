import express from 'express';
import {__dirname} from './utils.js'
import cors from 'cors'
import { config } from 'dotenv';
config();

import usersRouter from './routes/users.routes.js';
import authRouter from './routes/auth.routes.js';
import { authToken } from './functions/jwt.js';

const app = express();

app.use(cors());
app.use(express.static(__dirname + '/public'))

app.use('/api/users', usersRouter);

app.use(authToken)
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.sendFile('/index.html')
});

app.listen(process.env.PORT, ()=>{
    console.log('server up on ' + process.env.PORT)
})