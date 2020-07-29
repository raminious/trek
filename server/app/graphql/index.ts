import { SchemaComposer } from 'graphql-compose'

import { query as siteQuery, mutation as siteMutation } from '@app/models/site'
import { query as trackingCodeQuery } from '@app/queries/tracking-code'

const schema = new SchemaComposer()

// create queries
schema.Query.addFields({ ...siteQuery, ...trackingCodeQuery })

// create mutations
schema.Mutation.addFields({ ...siteMutation })

export default schema.buildSchema()
