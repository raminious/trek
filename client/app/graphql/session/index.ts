import { gql } from '@apollo/client'

export const GET_ALL_SESSIONS_QUERY = gql`
  query GetAllSessions {
    SessionMany(filter: {}) {
      _id
      client
      ip
      userAgent
      updatedAt
      createdAt
    }
  }
`
