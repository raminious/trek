import { Document, Model } from 'mongoose'
import { ObjectTypeComposer, Resolver } from 'graphql-compose'

import composeWithMongoose, {
  ComposeWithMongooseOpts,
} from 'graphql-compose-mongoose'

export function getMongooseDefaultSchema<
  TModel extends Document = any,
  TContext = any
>(
  modelName: string,
  collectionModel: Model<TModel>,
  opts?: ComposeWithMongooseOpts<TContext>
): {
  TC: ObjectTypeComposer<TModel, TContext>
  query: Record<string, Resolver>
  mutation: Record<string, Resolver>
} {
  const TC = composeWithMongoose(collectionModel, opts)

  const query = {
    [`${modelName}ById`]: TC.getResolver('findById'),
    [`${modelName}ByIds`]: TC.getResolver('findByIds'),
    [`${modelName}One`]: TC.getResolver('findOne'),
    [`${modelName}Many`]: TC.getResolver('findMany').wrapResolve(
      (next) => (resolveParams) =>
        next({
          ...resolveParams,
          beforeQuery: (query) => query.lean(),
        })
    ),
    [`${modelName}Count`]: TC.getResolver('count'),
    [`${modelName}Connection`]: TC.getResolver('connection'),
    [`${modelName}Pagination`]: TC.getResolver('pagination'),
  }

  TC.addResolver({
    name: 'findOrCreate',
    kind: 'mutation',
    type: TC.getResolver('createOne').getType(),
    args: TC.getResolver('createOne').getArgs(),
    resolve: async ({ source, args, context, info }) => {
      let item = await collectionModel.findOne(args.record).exec()

      if (!item) {
        item = await collectionModel.create(args.record)
      }

      return {
        record: item,
        recordId: TC.getRecordIdFn()(item),
      }
    },
  })

  const mutation = {
    [`${modelName}FindOrCreate`]: TC.getResolver('findOrCreate'),
    [`${modelName}CreateOne`]: TC.getResolver('createOne'),
    [`${modelName}UpdateById`]: TC.getResolver('updateById'),
    [`${modelName}RemoveById`]: TC.getResolver('removeById'),
    [`${modelName}RemoveOne`]: TC.getResolver('removeOne'),
    [`${modelName}RemoveMany`]: TC.getResolver('removeMany'),
  }

  return {
    TC,
    query,
    mutation,
  }
}
