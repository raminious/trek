import { SchemaComposer } from 'graphql-compose'

import { query as siteQuery, mutation as siteMutation } from '@app/models/site'

const schema = new SchemaComposer()

// create queries
schema.Query.addFields({ ...siteQuery })

// create mutations
schema.Mutation.addFields({ ...siteMutation })

export default schema.buildSchema()
