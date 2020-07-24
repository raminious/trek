import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { DialogProvider } from '@app/hooks/use-dialog/Provider'

import { ApplicationTheme } from './ApplicationTheme'
import { ApplicationLayout } from './layouts/Application'

function Application() {
  return (
    <BrowserRouter>
      <ApplicationTheme>
        <DialogProvider>
          <Switch>
            <Route path="/dashboard" component={ApplicationLayout} />
          </Switch>
        </DialogProvider>
      </ApplicationTheme>
    </BrowserRouter>
  )
}

export default Application
