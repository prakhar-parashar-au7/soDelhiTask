import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://Prakhar:passingwords@cluster0.ch2ng.mongodb.net/Assignment?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true })
.then(function(){
    console.log("Database connected")
})  
.catch((err) => {
    console.log(err.message)
  
})
