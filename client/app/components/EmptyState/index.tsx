import React from 'react'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import SvgIcon from '@material-ui/core/SvgIcon'

interface Props {
  Icon: typeof SvgIcon
  title: string
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.grey['50'],
    padding: theme.spacing(20, 0),
    borderRadius: theme.shape.borderRadius
  },
  icon: {
    fontSize: theme.spacing(10),
    color: theme.palette.grey['500']
  },
  title: {
    color: theme.palette.grey['500'],
    marginTop: theme.spacing(2)
  }
}))

export function EmptyState({ title, Icon }: Props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Icon className={classes.icon} />
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>
    </div>
  )
}
