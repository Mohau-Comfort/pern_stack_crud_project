//src/index.js
import express from 'express';
import cors from 'cors';
import clientRoute from './routes/clientRoute.js';

const app = express();
const port = 5000; 

app.use(cors()); //Enable All CORS Requests
app.use(express.json()); //Parse incoming request with JSON payloads (Middleware)
app.get('/', (req, res) => {
    res.send("<h1>Hello backend</h1>");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});