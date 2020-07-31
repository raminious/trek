import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const options = {
  poolSize: Number(process.env.DATABASE_POOLSIZE) || 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}

mongoose.Promise = global.Promise

// mongoose.set('debug', true)

mongoose.connect(process.env.DATABASE_URL!, options)

mongoose.connection.on(
  'error',
  console.error.bind(console, '[ x ] Connection error:')
)
mongoose.connection.once('open', (): void => {
  console.log('[ + ] MongoDB Connected')
})

export default mongoose
