import { gql } from '@apollo/client'

export const GET_SESSION_EVENTS_QUERY = gql`
  query GetSessionEvents($session: MongoID!) {
    EventMany(filter: { session: $session }, sort: _ID_ASC) {
      _id
      events
    }
  }
`
