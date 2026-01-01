import express from 'express';
import auth from './routes/auth.js'
import database from './routes/database.js'
import cors from 'cors';

const app = express()
const port = 8000
app.use(express.json());
app.use(cors());

app.use('/api/auth/', auth)
app.use('/api/database', database)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
