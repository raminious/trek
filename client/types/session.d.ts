declare interface ISessionQueryData {
  SessionOne: ISession
  SessionMany: ISession[]
}

declare interface ISession {
  _id: ObjectId
  site: ObjectId
  client: ISessionClient
  userAgent: string
  ip: string
  createdAt: Date
  updatedAt: Date
}

declare interface ISessionClient {
  browser: {
    name: string
    version: string
  }
  os: {
    name: string
    version: string
    versionName: string
  }
  platform: {
    type: string
    vendor: string
  }
  engine: {
    name: string
  }
}
