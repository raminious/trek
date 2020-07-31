import React from 'react'

import { CircularProgress } from '@material-ui/core'

import { useQuery } from '@apollo/client'

import { RouteComponentProps } from 'react-router-dom'

import Alert from '@material-ui/lab/Alert'

import { SessionPlayer } from '@app/components/SessionPlayer'
import { GET_SESSION_EVENTS_QUERY } from '@app/graphql/event'

export default function SessionReplayPage({
  match
}: RouteComponentProps<{
  id: ObjectId
}>) {
  const { loading, error, data } = useQuery<ISessionEventQueryData>(
    GET_SESSION_EVENTS_QUERY,
    {
      variables: {
        session: match.params.id
      }
    }
  )

  if (loading) {
    return (
      <div>
        <CircularProgress color="secondary" />
      </div>
    )
  }

  if (error) {
    return <Alert severity="error">Unable to replay this session</Alert>
  }

  return (
    <div>
      <SessionPlayer events={data?.EventMany!} />
    </div>
  )
}
