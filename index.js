const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 5000;
app.get('/', (req ,res)=> {
    res.send('Server is Running')
})
app.listen(port, () =>{
    console.log(`The server is run ${port} port`)
})