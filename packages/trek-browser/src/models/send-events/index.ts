import { eventWithTime } from 'rrweb/typings/types'

import { RecordOptions, Session } from '../../types'

export function sendEvents(
  options: RecordOptions,
  session: Session | null,
  events: eventWithTime[]
): void {
  if (!session) {
    return
  }

  fetch(`${options.serverUrl}/track/${options.siteKey}/events`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      events,
      session: session._id
    })
  })
}
