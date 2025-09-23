 const express = require("express");
 const mongoose = require("mongoose");
 const cors = require("cors");
 require('dotenv').config();

 const authRoutes = require('./routes/auth');

//const LearnerModel = require("./models/User")

 const app = express();
 
 //middleware
 app.use(express.json());
 app.use(cors());

 //Routes
 app.use('./api/auth', authRoutes);

 //Database connection
 mongoose.connect(process.env.MONGODB_URI || "mongodb//127.0.0.1.27017/mern_auth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
 })
 .then(() => console.log('MongoDB connected successfully'))
 .catch(err () => console.log(err));
 
 const PORT = process.env.PORT || 5000;

 app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
 });
// app.post('/register', (req, res) => {
  //UserModel.create(req.body).then(users => res.json(users)).catch(err => res.json(err))
// })
