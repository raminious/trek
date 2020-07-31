import { Schema, Model, Document, model } from 'mongoose'

import type { Resolver } from 'graphql-compose'

import { ObjectId } from '@types'
import { getMongooseDefaultSchema } from '@app/utils/mongoose-default-schema'
import { clearAllowedOriginsCache } from '@app/libs/cors-allowed-origins'

interface ISiteDocument extends Document {
  _id: ObjectId
  name: string
  domain: string
  isActive: boolean
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
      unique: true,
    },
    isActive: {
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

const { TC, query, mutation: originalMutation } = getMongooseDefaultSchema<
  ISiteDocument
>(modelName, Site)

function beforeRecordMutate(resolvers: Record<string, Resolver>) {
  Object.keys(resolvers).forEach((name) => {
    resolvers[name] = resolvers[name].wrapResolve((next) => async (rp) => {
      rp.beforeRecordMutate = async function (doc: ISite) {
        clearAllowedOriginsCache()

        return doc
      }

      return next(rp)
    })
  })

  return resolvers
}

const mutation = beforeRecordMutate(originalMutation)

export { Site, TC, query, mutation }
