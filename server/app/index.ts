import path from 'path'

import express from 'express'

const app = express()
const port = 8088

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../web')))

  app.get('/', (_, res) =>
    res.sendFile(path.resolve(__dirname, '../index.html'))
  )
} else {
  app.get('/', (_, res) => res.send('Trek is running...'))
}

app.listen(port, () => console.log(`Trek is running at http://0.0.0.0:${port}`))
