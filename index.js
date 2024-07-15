import express from 'express';
import router from './routes/router.js';
import { logger } from 'logger-express';

const app = express();

const PORT = 3000;

app.use(express.json())
app.use(logger())
app.use('/', router)
app.listen(PORT, () =>{
    console.log(`Servidor escuchando en puerto http://localhost:${PORT}`)
})