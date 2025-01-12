import express from 'express';

import swaggerDocs from './swagger.mjs';

const app = express()
app.use(express.json());
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => {
    swaggerDocs(app, port);
    console.log(`Listening on http://localhost:${port}`);
    console.log(`Documentation is on http://localhost:${port}/docs`);
})

