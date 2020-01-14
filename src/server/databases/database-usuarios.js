const Sequelize = require('sequelize')

var dbUsers = {}


const sequelize = new Sequelize('banco_almoxarifado', 'UserColab', '123456', {
    host: '132.1.4.23',
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
    require('../models/users.js'),
    require('../models/funcao-user.js')
]

// Initialize models
models.forEach(model => {
    const seqModel = model(sequelize, Sequelize)
    dbUsers[seqModel.name] = seqModel
})

// Apply associations

Object.keys(dbUsers).forEach(key => {
    
    if ('associate' in dbUsers[key]) {
        dbUsers[key].associate(dbUsers)
    }
})


dbUsers.sequelize = sequelize
dbUsers.Sequelize = Sequelize

module.exports = dbUsers
