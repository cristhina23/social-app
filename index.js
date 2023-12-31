import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import userRoute from './Routes/UserRoute.js';


// Routes


const app = express();

// Middleware
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

dotenv.config()

mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}` )
  })
}).catch((error) => {
  console.log(error)
})

// usage of routes
app.use('/auth', AuthRoute);
app.use('/user', userRoute);