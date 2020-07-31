import { Schema, Model, Document, model } from 'mongoose'

import { ObjectId } from '@types'
import { getMongooseDefaultSchema } from '@app/utils/mongoose-default-schema'

interface IEventDocument extends Document {
  _id: ObjectId
  site: ObjectId
}

export interface IEvent extends IEventDocument {}
export interface IEventModel extends Model<IEvent> {}

const EventSchema: Schema = new Schema(
  {
    session: {
      type: Schema.Types.ObjectId,
      index: true,
    },
    events: [Object],
  },
  {
    timestamps: true,
  }
)

const modelName = 'Event'

const Event: IEventModel = model<IEvent, IEventModel>(modelName, EventSchema)

const { TC, query, mutation } = getMongooseDefaultSchema<IEventDocument>(
  modelName,
  Event
)

export { Event, TC, query, mutation }
