import { Schema, Model, Document, model } from 'mongoose'

import { ObjectId } from '@types'

interface ISiteDocument extends Document {
  _id: ObjectId
  username: string
  secret: string
}

export interface ISite extends ISiteDocument {}

export interface ISiteModel extends Model<ISite> {
  getSite(name: string): Promise<ISite>
}

const SiteSchema: Schema = new Schema(
  {
    username: {
      type: String,
    },
    secret: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

SiteSchema.statics.getSite = async function (
  name: string
): Promise<ISite | null> {
  return this.findOne().where({ name })
}

const Site: ISiteModel = model<ISite, ISiteModel>('Site', SiteSchema)

export default Site
