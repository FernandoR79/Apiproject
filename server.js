const express = require('express');
const cors = require('cors');
const {connectDB} = require('./config/db');
const bodyParser = require('body-parser');

const app = express();

connectDB()

app.use(cors());
app.use(bodyParser.json())

app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, async() =>{
    console.log(`Server is running on port ${PORT}`)
    const {sequelize} = require('./config/db')
    try{
        await sequelize.sync();
        console.log ('Database synced')
    } catch(err){
        console.error('error base de datos'. err)
    }
})
