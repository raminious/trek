import { RecordOptions, Session } from '../../types'

export async function createSession(options: RecordOptions): Promise<Session> {
  return fetch(`${options.serverUrl}/track/${options.siteKey}/session`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      agent: window.navigator.userAgent
    })
  }).then(response => response.json())
}
