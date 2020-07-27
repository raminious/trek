import { Schema, Model, Document, model } from 'mongoose'

import { ObjectId } from '@types'
import { getMongooseDefaultSchema } from '@app/utils/mongoose-default-schema'

interface ISiteDocument extends Document {
  _id: ObjectId
  name: string
  domain: string
  is_active: boolean
}

export interface ISite extends ISiteDocument {}
export interface ISiteModel extends Model<ISite> {}

const SiteSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },
    domain: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const modelName = 'Site'

const Site: ISiteModel = model<ISite, ISiteModel>(modelName, SiteSchema)

const { TC, query, mutation } = getMongooseDefaultSchema<ISiteDocument>(
  modelName,
  Site
)

export { Site, TC, query, mutation }
