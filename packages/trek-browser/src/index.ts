import { record as start } from 'rrweb'

import { listenerHandler, eventWithTime } from 'rrweb/typings/types'

import { RecordOptions, Session } from './types'
import { createSession } from './models/create-session'
import { sendEvents } from './models/send-events'

let recorderStopFn: listenerHandler | undefined

function getRecordOptions(options: RecordOptions) {
  if (!options.recordOptions) {
    return {
      checkoutEveryNms: 10 * 1000
    }
  }

  return options.recordOptions
}

export async function record(options: RecordOptions): Promise<void> {
  let session: Session | null = null
  const events: [eventWithTime[]] = [[]]

  if (!options.siteKey) {
    throw new Error('Site key is not provided')
  }

  if (!options.serverUrl) {
    throw new Error('Server url is not provided')
  }

  if (recorderStopFn) {
    console.log('The Trek recorder is already instantiated')
    return
  }

  // create session
  session = await createSession(options)

  // start recording
  recorderStopFn = start({
    emit(event: eventWithTime, isCheckout: boolean | undefined) {
      if (isCheckout) {
        sendEvents(options, session, events[events.length - 1])
        events.push([])

        return
      }

      events[events.length - 1].push(event)
    },
    ...getRecordOptions(options)
  })
}

export function stop(): void {
  if (recorderStopFn) {
    recorderStopFn()
    recorderStopFn = undefined
  }
}
