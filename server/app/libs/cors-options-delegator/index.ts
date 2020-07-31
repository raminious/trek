import { Request } from 'express'
import { CorsOptions } from 'cors'

import { getAllowedOrigins } from '@app/libs/cors-allowed-origins'

type Callback = (error: Error | null, options: CorsOptions | undefined) => void

export async function corsOptionsDelegate(
  req: Request,
  callback: Callback
): Promise<ReturnType<Callback>> {
  if (process.env.CORS_DISABLED) {
    return callback(null, {
      origin: true,
    })
  }

  const list = await getAllowedOrigins()
  const isAllowed = list.includes(req.header('Origin') || '')

  return callback(null, {
    origin: isAllowed,
  })
}
