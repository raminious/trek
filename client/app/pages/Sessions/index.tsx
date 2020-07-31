import React from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

import { useTitle } from 'react-use'
import fecha from 'fecha'

import { useQuery } from '@apollo/client'

import { PageHeader } from '@app/components/PageHeader'
import { TableBodySkeleton } from '@app/components/TableSkeleton'
import { GET_ALL_SESSIONS_QUERY } from '@app/graphql/session'

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: '100%'
  },
  title: {
    fontWeight: 500
  },
  icon: {
    fontSize: theme.spacing(3)
  },
  alert: {
    marginBottom: theme.spacing(2)
  }
}))

export default function SessionsPage() {
  useTitle('Trek | Session')
  const classes = useStyles()

  const { loading, error, data } = useQuery<ISessionQueryData>(
    GET_ALL_SESSIONS_QUERY
  )

  return (
    <div>
      <PageHeader title="Session Playlist" />

      {error && (
        <Alert severity="error" className={classes.alert}>
          Unable to fetch sessions playlist
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table className={classes.table} stickyHeader aria-label="websites">
          {loading && <TableBodySkeleton columns={4} rows={10} />}

          <TableBody>
            {!loading &&
              data?.SessionMany.map(session => (
                <TableRow key={session._id} hover>
                  <TableCell component="th" scope="row">
                    {fecha.format(
                      new Date(session.createdAt),
                      'YYYY-MM-DD HH:MM A'
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
