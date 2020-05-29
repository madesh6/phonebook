require('dotenv').config();
const path = require('path')
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const contactRoutes = require('./routes/contact');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/contact', contactRoutes);

app.get('/', (req, res)=>{
    res.sendFile(path.resolve('index.html'));
})

app.listen(process.env.PORT, ()=>{
    console.log(`app is listening on port ${process.env.PORT}`);
});