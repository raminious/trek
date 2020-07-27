import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { ApplicationLayout } from './layouts/Application'
import { Providers } from './Providers'

function Application() {
  return (
    <BrowserRouter>
      <Providers>
        <Switch>
          <Route path="/dashboard" component={ApplicationLayout} />
        </Switch>
      </Providers>
    </BrowserRouter>
  )
}

export default Application
