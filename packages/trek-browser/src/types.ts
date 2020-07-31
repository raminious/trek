import { recordOptions, eventWithTime } from 'rrweb/typings/types'

declare interface RecordOptions {
  siteKey: string
  serverUrl: string
  recordOptions?: recordOptions<eventWithTime>
}

declare interface Session {
  _id: string
}

export type { RecordOptions, Session }
