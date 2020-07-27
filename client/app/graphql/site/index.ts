import { gql } from '@apollo/client'

export const GET_ALL_SITES_QUERY = gql`
  query GetAllSites {
    SiteMany(filter: {}) {
      _id
      name
      domain
      isActive
    }
  }
`

export const UPDATE_SITE_STATUS_MUTATION = gql`
  mutation UpdateSiteStatus($id: MongoID!, $status: Boolean!) {
    SiteUpdateById(record: { _id: $id, isActive: $status }) {
      record {
        _id
        name
        domain
        isActive
      }
    }
  }
`

export const DELETE_SITE_MUTATION = gql`
  mutation DeleteSite($id: MongoID!) {
    SiteRemoveById(_id: $id) {
      record {
        _id
      }
    }
  }
`
