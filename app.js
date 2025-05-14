const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())

app.listen(PORT,()=>{
    try {
        console.log("server is running on ",PORT);
        
    } catch (error) {
            console.error('ERROR',error.message);         
    }
})