import path from 'path'

import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import dotenv from 'dotenv'

import './connectors/mongodb'

dotenv.config()

const typeDefs = gql`
  type Query {
    name: String
  }
`

const resolvers = {
  Query: {
    name: () => 'Ramin',
  },
}

const app = express()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../web')))

  app.get('/', (_, res) =>
    res.sendFile(path.resolve(__dirname, '../index.html'))
  )
} else {
  app.get('/', (_, res) => res.send('Trek is running...'))
}

// connect to Apollo Server
new ApolloServer({
  typeDefs,
  resolvers,
  cacheControl: true,
  engine: {
    reportSchema: true,
  },
}).applyMiddleware({
  app,
  path: '/api',
})

const port = 8088

app.listen(port, () =>
  console.log(`[ + ] Trek is running at http://0.0.0.0:${port}`)
)
