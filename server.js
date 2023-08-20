require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const page1Routes=require('./routes/page1')
const page2Routes =require('./routes/page2')
const page3Routes=require('./routes/page3')
const page4Routes=require('./routes/page4')
// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
app.use('/page1', page1Routes);
app.use('/page2',page2Routes)
app.use('/page3',page3Routes)
app.use('/page4',page4Routes)
//connection to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected hjtoh dbssas & dlistenng on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })