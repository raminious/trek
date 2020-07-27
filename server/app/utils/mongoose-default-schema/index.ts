import composeWithMongoose, {
  ComposeWithMongooseOpts,
} from 'graphql-compose-mongoose'
import { Document, Model } from 'mongoose'

export function getMongooseDefaultSchema<
  TModel extends Document = any,
  TContext = any
>(
  modelName: string,
  collectionModel: Model<TModel>,
  opts?: ComposeWithMongooseOpts<TContext>
): {
  query: Record<string, any>
  mutation: any
} {
  const TC = composeWithMongoose(collectionModel, opts)

  const query = {
    [`${modelName}ById`]: TC.getResolver('findById'),
    [`${modelName}ByIds`]: TC.getResolver('findByIds'),
    [`${modelName}One`]: TC.getResolver('findOne'),
    [`${modelName}Many`]: TC.getResolver('findMany'),
    [`${modelName}Count`]: TC.getResolver('count'),
    [`${modelName}Connection`]: TC.getResolver('connection'),
    [`${modelName}Pagination`]: TC.getResolver('pagination'),
  }

  const mutation = {
    [`${modelName}CreateOne`]: TC.getResolver('createOne'),
    [`${modelName}CreateMany`]: TC.getResolver('createMany'),
    [`${modelName}UpdateById`]: TC.getResolver('updateById'),
    [`${modelName}UpdateOne`]: TC.getResolver('updateOne'),
    [`${modelName}UpdateMany`]: TC.getResolver('updateMany'),
    [`${modelName}RemoveById`]: TC.getResolver('removeById'),
    [`${modelName}RemoveOne`]: TC.getResolver('removeOne'),
    [`${modelName}RemoveMany`]: TC.getResolver('removeMany'),
  }

  return {
    query,
    mutation,
  }
}
