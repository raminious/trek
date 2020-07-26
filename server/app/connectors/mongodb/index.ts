import dotenv from 'dotenv'
import mongoose from 'mongoose'

import Site from '@app/models/site'

dotenv.config()

const options = {
  poolSize: Number(process.env.DATABASE_POOLSIZE) || 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}

mongoose.Promise = global.Promise

mongoose.connect(process.env.DATABASE_URL!, options)

mongoose.connection.on(
  'error',
  console.error.bind(console, '[ x ] Connection error:')
)
mongoose.connection.once('open', (): void => {
  console.log('[ + ] MongoDB Connected')
})

mongoose.models.Site = Site

export default mongoose
