import express, { Application } from 'express';
import  connectDB  from './config/db';
import dotenv from 'dotenv';
import cors from "cors";
import urlRoutes from './routes/urlRoutes';

dotenv.config();


const app: Application = express();
app.use(express.json());
app.use(cors());


// Connect to the database
connectDB()
// Set up routes
app.use('/api', urlRoutes);


app.get('/',(req, res) => {
    res.send('API is running...');
})
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('https://snaplink-iskj.onrender.com');
  
});
