import express, { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
import bodyParser from 'body-parser'

import Bowser from 'bowser'

import { Site, ISite } from '@app/models/site'
import { Session } from '@app/models/session'
import { EXPRESS_MONGO_ID } from '@app/helpers/express-mongo-param-id'

const app = express()

function validate() {
  return [body('agent').isString()]
}

export default app.post(
  `/track/${EXPRESS_MONGO_ID}/session`,
  [bodyParser.json(), ...validate()],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params

    let site: ISite | null

    try {
      site = (await Site.findById(id))!
    } catch (e) {
      return next('Invalid site key')
    }

    if (!site.isActive) {
      return res.status(400).send('Site is inactive')
    }

    const { agent } = req.body

    const record = new Session({
      site: site._id,
      browser: Bowser.parse(agent),
      userAgent: agent,
      ip: req.ip,
    })

    const session = await record.save()

    res.send(session)
  }
)
