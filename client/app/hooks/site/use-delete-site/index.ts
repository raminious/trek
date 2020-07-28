import { useMutation } from '@apollo/client'

import { DELETE_SITE_MUTATION, GET_ALL_SITES_QUERY } from '@app/graphql/site'

export function useDeleteSite() {
  const [deleteSite] = useMutation(DELETE_SITE_MUTATION)

  return (id: ObjectId) => {
    return deleteSite({
      variables: {
        id
      },
      update(
        proxy,
        {
          data: {
            SiteRemoveById: { record }
          }
        }: {
          data: ISiteMutationData
        }
      ) {
        const data: ISiteQueryData | null = proxy.readQuery({
          query: GET_ALL_SITES_QUERY
        })

        proxy.writeQuery({
          query: GET_ALL_SITES_QUERY,
          data: {
            SiteMany: data?.SiteMany.filter(site => site._id !== record._id)
          }
        })
      }
    })
  }
}
