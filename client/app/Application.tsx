import React from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { ApplicationTheme } from './ApplicationTheme'
import { ApplicationLayout } from './layouts/Application'

function Application() {
  return (
    <BrowserRouter>
      <ApplicationTheme>
        <Switch>
          <Route path="/dashboard" component={ApplicationLayout} />
        </Switch>
      </ApplicationTheme>
    </BrowserRouter>
  )
}

export default hot(Application)
