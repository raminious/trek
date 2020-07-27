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
    },
  },
  {
    timestamps: true,
  }
)

const modelName = 'Site'

export const Site: ISiteModel = model<ISite, ISiteModel>(modelName, SiteSchema)
export const { query, mutation } = getMongooseDefaultSchema<ISiteDocument>(
  modelName,
  Site
)
