import { Express } from "express";

let app=express(),
port=3000;

app.use(express.json())


app.listen(port,()=>{
    console.log('Server connected..');
})