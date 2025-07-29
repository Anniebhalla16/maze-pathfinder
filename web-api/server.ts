const express = require('express')
const cors = require('cors');

const app = express()
const port = 3001

app.use(cors());
app.use(express.json());

app.get('/',(req:any,res:any)=>{
    res.send("Hello World")
})

app.get('/numbers',(req:any,res:any)=>{
    const data = [1,2,3,4,5]
    res.json({numbers:data})
})



app.post('/sum', (req:any, res:any)=>{
    const {a,b}= req.body;
    const sum= a+b;
    res.json({sum})
})

app.listen(port,()=>{
    console.log("Listening on port 3001")
})