const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('userauth', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

const connectDB = async() =>{
    try {
        await sequelize.authenticate()
        console.log('connected to database')
    } catch(err){
        console.error('Error connecting to database', err)

    }
    
}

module.exports = {sequelize,connectDB}

//mysql://root:pBuGesosNDOGFpNYixWaVNWasZuzKFQH@roundhouse.proxy.rlwy.net:20893/railway