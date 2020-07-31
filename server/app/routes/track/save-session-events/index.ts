import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { body, validationResult } from 'express-validator'

import { EXPRESS_MONGO_ID } from '@app/helpers/express-mongo-param-id'
import { Event } from '@app/models/event'

const app = express()

function validate() {
  return [body('session').isString(), body('events').isArray()]
}

export default app.post(
  `/track/${EXPRESS_MONGO_ID}/events`,
  [bodyParser.json(), ...validate()],
  async (req: Request, res: Response) => {
    const { session, events } = req.body

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    new Event({
      session,
      events,
    }).save()

    res.json({})
  }
)
