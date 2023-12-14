const express = require('express');
const bodyParser = require('body-parser');
const router = require('./Router/router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/',router);

const port =3000;

app.listen(port,()=>{console.log(`App is running on port http://localhost:${port}`)});