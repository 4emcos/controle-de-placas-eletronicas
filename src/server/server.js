import '@babel/polyfill'
import express from 'express'
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const cors = require('cors')
const app = express()


app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const server = new ApolloServer({
    modules: [
        require('./graph-ql/users'),
        require('./graph-ql/funcao-user'),
        require('./graph-ql/placas-embratex'),
        require('./graph-ql/placas-wentex'),
      //  require('./graph-ql/dados')

    ],
})

server.applyMiddleware({ app })


app.listen({ port: 5000 }, () =>
    console.log(`🚀 Server ready at http://localhost:5000`),
)




