import { Site } from '@app/models/site'

const list: {
  origins?: string[]
  expireAt?: number
} = {}

export async function getAllowedOrigins(): Promise<string[]> {
  if (Array.isArray(list.origins) && Number(list.expireAt) > Date.now()) {
    return list.origins
  }

  const sites = await Site.find({ isActive: true }).lean()

  list.origins = sites.map((site) => site.domain)
  list.expireAt = Date.now() + 10 * 60 * 1000

  return list.origins
}

export function clearAllowedOriginsCache(): void {
  list.expireAt = Date.now()
}
