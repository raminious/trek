import React, { useState, lazy, Suspense } from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'

import { Switch, Route } from 'react-router-dom'

import { SideNav } from '@app/components/SideNav'
import { PageAppBar } from '@app/components/AppBar'
import { SuspenseFallback } from '@app/components/SuspenseFallback'

const WebsitesPage = lazy(() => import('../../pages/Sites'))
const SessionsPage = lazy(() => import('../../pages/Sessions'))

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}))

export function ApplicationLayout() {
  const classes = useStyles()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleDrawerToggle = () => setIsMenuOpen(state => !state)

  return (
    <div className={classes.root}>
      <PageAppBar onDrawerToggle={handleDrawerToggle} />
      <SideNav isMenuOpen={isMenuOpen} onDrawerToggle={handleDrawerToggle} />

      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Suspense fallback={<SuspenseFallback />}>
          <Switch>
            <Route exact path="/dashboard/sites" component={WebsitesPage} />
            <Route exact path="/dashboard/sessions" component={SessionsPage} />
          </Switch>
        </Suspense>
      </main>
    </div>
  )
}
