import express from 'express';
import axios from 'axios';
import cors from 'cors'; 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.get('/information', async (req, res) => {
  try {
    const response = await axios.get('https://api.jsonbin.io/v3/b/67579c9cad19ca34f8d87192', {
      headers: {
        'X-Master-Key': '$2a$10$7w3VcmT.B7rqVSCm/vok8u/CpprJpveDoIogwVSLZK9AZoFdxbCLG',  // Replace with your actual API key
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// Default route (root)
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
