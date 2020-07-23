import React from 'react'

import { Drawer, Hidden, useTheme, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { DRAWER_WIDTH } from '@app/constants/drawers'

import { MenuList } from '@app/components/SideNav/Menu'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0
    }
  },
  appBar: {
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
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    backgroundColor: '#253053',
    color: theme.palette.common.white
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}))

interface Props {
  isMenuOpen: boolean
  onDrawerToggle: () => void
}

export function SideNav({ isMenuOpen, onDrawerToggle }: Props) {
  const classes = useStyles()
  const theme = useTheme<Theme>()

  return (
    <nav className={classes.drawer} aria-label="menu">
      <Hidden smUp implementation="css">
        <Drawer
          container={document.body}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={isMenuOpen}
          onClose={onDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          <MenuList />
        </Drawer>
      </Hidden>

      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          <MenuList />
        </Drawer>
      </Hidden>
    </nav>
  )
}
