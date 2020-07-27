import { ApolloClient, InMemoryCache } from '@apollo/client'

import config from '@app/configs'

export const graphqlClient = new ApolloClient({
  uri: config.API_URL,
  cache: new InMemoryCache()
})
