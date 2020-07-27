import React from 'react'

import { makeStyles, Theme } from '@material-ui/core'

interface Props {
  children: React.ReactNode
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: theme.spacing(7),
      borderTop: `1px solid ${theme.palette.divider}`,
      position: 'sticky',
      bottom: 0,
      backgroundColor: '#fff'
    }
  }),
  { name: 'OverlayDrawer' }
)

export function OverlayDrawerFooter({ children }: Props) {
  const classes = useStyles()

  return <div className={classes.footer}>{children}</div>
}
