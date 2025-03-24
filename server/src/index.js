//src/index.js
import express from 'express';

const app = express();
const port = 5000; 

app.get('/', (req, res) => {
    res.send("<h1>Hello backend</h1>");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});