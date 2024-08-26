const express = require('express');
const mongoose = require('mongoose');  
const cors = require('cors');      
const route = require("./Route/index");     


const port = 5500;
const hostname = 'localhost';

const atlasDbUrl = 'mongodb+srv://tilak123:1HGQrJ8cG65iNCqM@cluster0.lgqzpon.mongodb.net/zomato?retryWrites=true&w=majority'; 

const corsOptions = {
     origin:'http://localhost:3000',
     credentials: true,
     OptionSuccessStatus: 200
}

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use('/',route);

mongoose.connect(atlasDbUrl, {
  useNewUrlParser: true, useUnifiedTopology: true 
})
 
.then(res =>{
    app.listen(port, hostname, ()=>{
    console.log(`Server is running at ${hostname}: ${port}`)
   })
})
.catch(err =>console.log(err));

