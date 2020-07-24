import React from 'react'

import { Divider, List } from '@material-ui/core'

import { makeStyles, Theme } from '@material-ui/core/styles'

import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded'
import HttpRoundedIcon from '@material-ui/icons/HttpRounded'
import TuneRoundedIcon from '@material-ui/icons/TuneRounded'
import VideoLibraryRoundedIcon from '@material-ui/icons/VideoLibraryRounded'
import CommentRoundedIcon from '@material-ui/icons/CommentRounded'
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded'
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded'

import { MenuItem } from './MenuItem'

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: theme.mixins.toolbar
}))

export function MenuList() {
  const classes = useStyles()

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <MenuItem
          text="Dashboard"
          url="/dashboard"
          Icon={DashboardRoundedIcon}
        />
        <MenuItem text="Sites" url="/dashboard/sites" Icon={HttpRoundedIcon} />
        <MenuItem
          text="Sessions"
          url="/dashboard/sessions"
          Icon={VideoLibraryRoundedIcon}
        />
        <MenuItem
          text="Notes"
          url="/dashboard/notes"
          Icon={CommentRoundedIcon}
        />
        <MenuItem
          text="Clients"
          url="/dashboard/clients"
          Icon={PeopleAltRoundedIcon}
        />
        <MenuItem
          text="Settings"
          url="/dashboard/settings"
          Icon={TuneRoundedIcon}
        />

        <Divider />

        <MenuItem
          text="Logout"
          url="/dashboard/logout"
          Icon={ExitToAppRoundedIcon}
        />
      </List>
    </div>
  )
}
