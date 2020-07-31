declare interface ISessionEventQueryData {
  EventMany: ISessionEvent[]
}

declare interface ISessionEvent {
  _id: ObjectId
  session: ObjectId
  events: {
    data: string
    timestamp: number
    type: number
  }[]
}
