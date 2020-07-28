import { useMutation } from '@apollo/client'

import { CREATE_SITE_MUTATION, GET_ALL_SITES_QUERY } from '@app/graphql/site'

export function useCreateSite() {
  const [createSite] = useMutation(CREATE_SITE_MUTATION)

  return ({ name, domain, isActive = true }: Partial<ISite>) => {
    return createSite({
      variables: {
        record: {
          name,
          domain,
          isActive
        }
      },
      update(
        proxy,
        {
          data: {
            SiteCreateOne: { record }
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
            SiteMany: [...(data?.SiteMany || []), record]
          }
        })
      }
    })
  }
}
