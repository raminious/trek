import program from 'commander'
import dotenv from 'dotenv'
import 'module-alias/register'
import '../app/alias'

dotenv.config()

import app from '../app'

program
  .option(
    '-H, --host <host>',
    'specify the host [0.0.0.0]',
    process.env.HOST || '0.0.0.0'
  )
  .option(
    '-p, --port <port>',
    'specify the port [8089]',
    process.env.PORT || '8089'
  )
  .option(
    '-b, --backlog <size>',
    'specify the backlog size [511]',
    process.env.BACKLOG || '511'
  )
  .parse(process.argv)

app.listen(program.port, program.host, Number(program.backlog), () =>
  console.log(`[ + ] Trek is running at http://0.0.0.0:${program.port}`)
)
