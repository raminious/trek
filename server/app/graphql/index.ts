import { SchemaComposer } from 'graphql-compose'

import { query as siteQuery, mutation as siteMutation } from '@app/models/site'
import {
  query as sessionQuery,
  mutation as sessionMutation,
} from '@app/models/session'
import {
  query as eventQuery,
  mutation as eventMutation,
} from '@app/models/event'
import { query as trackingCodeQuery } from '@app/queries/tracking-code'

const schema = new SchemaComposer()

// create queries
schema.Query.addFields({
  ...siteQuery,
  ...sessionQuery,
  ...eventQuery,
  ...trackingCodeQuery,
})

// create mutations
schema.Mutation.addFields({
  ...siteMutation,
  ...sessionMutation,
  ...eventMutation,
})

export default schema.buildSchema()
