import * as rrweb from 'rrweb'

interface Options {
  key: string
  server: string
}

export function record(options: Options) {
  if (!options.key) {
    throw new Error('Site key is not provided')
  }

  if (!options.server) {
    throw new Error('Server url is not provided')
  }

  rrweb.record({
    emit(event) {
      console.log(`[ + ]:`, event)
    }
  })
}
