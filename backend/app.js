const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRoutes.js')
const postRouter = require('./routes/postRoutes.js')

app.use(express.json())
app.use(cors())
app.use('/users', userRouter)
app.use('/posts', postRouter)


mongoose.connect("mongodb://127.0.0.1:27017/writewave",{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=>{
    console.log("DB Connection Successful");
})


app.get('/test',(req, res)=>{
    console.log("Test Successful");
    res.status(200).json({
        message:"Successful"
    })
})

app.listen(6969,()=>{
    console.log("listening on port 6969");
})