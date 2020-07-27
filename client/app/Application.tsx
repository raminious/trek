import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'

import { DialogProvider } from '@app/hooks/use-dialog/Provider'

import { ApplicationTheme } from './ApplicationTheme'
import { ApplicationLayout } from './layouts/Application'
import { graphqlClient } from './services/graphql-client'

function Application() {
  return (
    <BrowserRouter>
      <ApolloProvider client={graphqlClient}>
        <ApplicationTheme>
          <DialogProvider>
            <Switch>
              <Route path="/dashboard" component={ApplicationLayout} />
            </Switch>
          </DialogProvider>
        </ApplicationTheme>
      </ApolloProvider>
    </BrowserRouter>
  )
}

export default Application
