import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'

import { makeStyles, Theme } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'

import { DRAWER_WIDTH } from '@app/constants/drawers'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
}))

interface Props {
  onDrawerToggle: () => void
}

export function Header({ onDrawerToggle }: Props) {
  const classes = useStyles()

  return (
    <AppBar position="fixed" color="transparent" className={classes.root}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Trek
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
