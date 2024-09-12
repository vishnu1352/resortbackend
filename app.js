require('dotenv').config();
const express = require('express');
const app = express();
require('./db/conn');
const cors = require("cors");
const router = require('./routes/router')
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(router)




app.listen(PORT, () => {
    console.log("server listening on port "+PORT)
})