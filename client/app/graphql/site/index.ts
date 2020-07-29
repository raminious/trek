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

export const GET_SITE_TRACKING_CODE_QUERY = gql`
  query GetTrackingCode($id: MongoID!) {
    SiteTrackingCode(_id: $id) {
      code
    }
  }
`

export const CREATE_SITE_MUTATION = gql`
  mutation CreateSite($record: CreateOneSiteInput!) {
    SiteCreateOne(record: $record) {
      record {
        _id
        name
        domain
        isActive
      }
    }
  }
`

export const UPDATE_SITE_MUTATION = gql`
  mutation UpdateSite($record: UpdateByIdSiteInput!) {
    SiteUpdateById(record: $record) {
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
