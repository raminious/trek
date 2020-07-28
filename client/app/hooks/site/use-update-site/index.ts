import { useMutation } from '@apollo/client'

import { UPDATE_SITE_MUTATION } from '@app/graphql/site'

export function useUpdateSite() {
  const [updateSite] = useMutation(UPDATE_SITE_MUTATION)

  return (site: ISite, record: Partial<ISite>) => {
    return updateSite({
      variables: {
        record: {
          _id: site._id,
          ...record
        }
      },
      optimisticResponse: {
        __typename: 'Mutation',
        SiteUpdateById: {
          record: {
            ...site,
            ...record
          }
        }
      }
    })
  }
}
