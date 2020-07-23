import React from 'react'
import { Link } from 'react-router-dom'

import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'

interface Props {
  text: string
  url: string
  Icon: typeof SvgIcon
}

const useStyles = makeStyles((theme: Theme) => ({
  menuTitle: {
    fontSize: theme.spacing(2),
    fontWeight: 600
  },
  icon: {
    color: theme.palette.grey['400'],
    fontSize: theme.spacing(3)
  }
}))

export function MenuItem({ text, url, Icon }: Props) {
  const classes = useStyles()

  return (
    <ListItem button component={Link} to={url}>
      <ListItemIcon>
        <Icon className={classes.icon} />
      </ListItemIcon>
      <ListItemText
        primary={text}
        primaryTypographyProps={{
          className: classes.menuTitle
        }}
      />
    </ListItem>
  )
}
