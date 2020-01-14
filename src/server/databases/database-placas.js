const Sequelize = require('sequelize')

var dbPlacas = {}


const sequelize = new Sequelize('controle_placas_sys', 'root', '123456', {
    host: 'localhost',
    port: '3307',
    dialect: 'mysql',
    define: {
        freezeTableName: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false,
})


let models = [
    require('../models/placas-embratex'),
    require('../models/placas-wentex'),
    require('../models/verified-users')
]

// Initialize models
models.forEach(model => {
    const seqModel = model(sequelize, Sequelize)
    dbPlacas[seqModel.name] = seqModel
})

// Apply associations

Object.keys(dbPlacas).forEach(key => {
    
    if ('associate' in dbPlacas[key]) {
        dbPlacas[key].associate(dbPlacas)
    }
})


dbPlacas.sequelize = sequelize
dbPlacas.Sequelize = Sequelize

module.exports = dbPlacas
