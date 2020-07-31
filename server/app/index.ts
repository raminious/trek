import path from 'path'

import express from 'express'

import { express as voyagerMiddleware } from 'graphql-voyager/middleware'

import { ApolloServer } from 'apollo-server-express'

import cors from 'cors'

import { corsOptionsDelegate } from '@app/libs/cors-options-delegator'

import createTrackerSession from '@app/routes/track/create-session'
import saveTrackerEvents from '@app/routes/track/save-session-events'

import './connectors/mongodb'
import schema from '@app/graphql'

const app = express()

app.set('trust proxy', true)

app.use(cors(corsOptionsDelegate))

// connect to Apollo Server
new ApolloServer({
  schema,
  cacheControl: true,
  engine: {
    reportSchema: true,
  },
}).applyMiddleware({
  app,
  path: '/api',
})

/* route middlewares */

/* /track/:id/session */
app.use(createTrackerSession)

/* /track/:id/events */
app.use(saveTrackerEvents)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../web')))

  app.get(['/', '/*'], (_, res) =>
    res.sendFile(path.resolve(__dirname, '../../web/index.html'))
  )
} else {
  app.get('/', (_, res) => res.send('Trek is running...'))
  app.use('/voyager', voyagerMiddleware({ endpointUrl: '/api' }))
}

export default app
