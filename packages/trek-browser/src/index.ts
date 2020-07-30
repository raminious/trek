import * as rrweb from 'rrweb'

import { listenerHandler } from 'rrweb/typings/types'

import { RecordOptions } from './types'

export function record(options: RecordOptions): listenerHandler | undefined {
  if (!options.siteKey) {
    throw new Error('Site key is not provided')
  }

  if (!options.serverUrl) {
    throw new Error('Server url is not provided')
  }

  return rrweb.record({
    emit(event) {
      console.log(`[ + ]:`, event)
    }
  })
}
