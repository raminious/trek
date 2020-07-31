import express from 'express'
import bodyParser from 'body-parser'

import { EXPRESS_MONGO_ID } from '@app/helpers/express-mongo-param-id'

const app = express()

export default app.post(
  `/track/${EXPRESS_MONGO_ID}/events`,
  bodyParser.json(),
  async (req, res, next) => {
    res.send('')
  }
)
