declare interface ISiteQueryData {
  SiteOne: ISite
  SiteMany: ISite[]
}

declare interface ISiteMutationData {
  SiteUpdateById: {
    record: ISite
  }
  SiteRemoveById: {
    record: Pick<ISite, '_id'>
  }
  SiteCreateOne: {
    record: ISite
  }
}

declare interface ISite {
  _id: ObjectId
  name: string
  domain: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
