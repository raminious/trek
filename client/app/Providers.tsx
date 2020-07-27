import React from 'react'

import { ApolloProvider } from '@apollo/client'
import { SnackbarProvider } from 'notistack'

import { DialogProvider } from '@app/hooks/use-dialog/Provider'

import { ApplicationThemeProvider } from './ApplicationTheme'
import { graphqlClient } from './services/graphql-client'

interface Props {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <ApolloProvider client={graphqlClient}>
      <ApplicationThemeProvider>
        <SnackbarProvider
          maxSnack={5}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <DialogProvider>{children}</DialogProvider>
        </SnackbarProvider>
      </ApplicationThemeProvider>
    </ApolloProvider>
  )
}
