import { Schema, Model, Document, model } from 'mongoose'

import { ObjectId } from '@types'
import { getMongooseDefaultSchema } from '@app/utils/mongoose-default-schema'

interface ISessionDocument extends Document {
  _id: ObjectId
  site: ObjectId
}

export interface ISession extends ISessionDocument {}
export interface ISessionModel extends Model<ISession> {}

const SessionSchema: Schema = new Schema(
  {
    site: {
      type: Schema.Types.ObjectId,
      index: true,
    },
    browser: {
      type: Object,
    },
    userAgent: String,
    ip: String,
  },
  {
    timestamps: true,
  }
)

const modelName = 'Session'

const Session: ISessionModel = model<ISession, ISessionModel>(
  modelName,
  SessionSchema
)

const { TC, query, mutation } = getMongooseDefaultSchema<ISessionDocument>(
  modelName,
  Session
)

export { Session, TC, query, mutation }
