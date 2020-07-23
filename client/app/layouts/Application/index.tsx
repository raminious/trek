import React, { useState } from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'

import { Switch, Route } from 'react-router-dom'

import { SideNav } from '@app/components/SideNav'
import { Header } from '@app/components/Header'
import { WebsitesPage, SessionsPage } from '@app/routes'

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
      <Header onDrawerToggle={handleDrawerToggle} />
      <SideNav isMenuOpen={isMenuOpen} onDrawerToggle={handleDrawerToggle} />

      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Switch>
          <Route exact path="/dashboard/sites" component={WebsitesPage} />
          <Route exact path="/dashboard/sessions" component={SessionsPage} />
        </Switch>
      </main>
    </div>
  )
}
