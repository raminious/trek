import { recordOptions, eventWithTime } from 'rrweb/typings/types'

declare type ObjectId = 'string'

declare interface RecordOptions {
  siteKey: string
  serverUrl: string
  recordOptions?: recordOptions<eventWithTime>
}

declare interface Session {
  _id: ObjectId
}

export type { RecordOptions, Session }
