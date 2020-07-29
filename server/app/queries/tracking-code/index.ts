import { schemaComposer } from 'graphql-compose'

import { getClientTrackingCode } from '@app/libs/tracking-code-client'

const SiteTrackingCodeTC = schemaComposer.createObjectTC({
  name: 'SiteTrackingCode',
  fields: {
    code: 'String!',
  },
})

SiteTrackingCodeTC.addResolver({
  kind: 'query',
  name: 'SiteTrackingCode',
  args: {
    _id: 'MongoID!',
  },
  type: SiteTrackingCodeTC,
  resolve: async ({ args }) => {
    return {
      code: getClientTrackingCode(args._id),
    }
  },
})

const query = {
  SiteTrackingCode: SiteTrackingCodeTC.getResolver('SiteTrackingCode'),
}

export { query }
