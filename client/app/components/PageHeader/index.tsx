import React from 'react'
import { makeStyles, Theme, Typography } from '@material-ui/core'

interface Props {
  title: string
  children?: React.ReactNode
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
    marginBottom: theme.spacing(2),
    '& button': {
      marginLeft: theme.spacing(1)
    }
  },
  title: {
    fontWeight: 500,
    color: theme.palette.secondary.main
  }
}))

export function PageHeader({ title, children }: Props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>
      {children && <div>{children}</div>}
    </div>
  )
}
