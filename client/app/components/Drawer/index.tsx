import React from 'react'
import {
  Drawer,
  makeStyles,
  Theme,
  Typography,
  IconButton
} from '@material-ui/core'

import CloseRoundedIcon from '@material-ui/icons/CloseRounded'

interface Props {
  isOpen: boolean
  title: string
  children: React.ReactNode
  renderFooter?: () => React.ReactNode
  onClose: () => void
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    modal: {
      zIndex: theme.zIndex.drawer
    },
    paper: {
      width: '100%',
      '@media (min-width: 48em)': {
        width: '40rem'
      }
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: theme.spacing(8),
      margin: theme.spacing(0, 2),
      borderBottom: `1px solid ${theme.palette.divider}`,
      position: 'sticky',
      top: 0,
      backgroundColor: '#fff'
    },
    headerTitle: {
      fontWeight: 500
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flexGrow: 1
    },
    content: {
      padding: theme.spacing(2)
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: theme.spacing(7),
      margin: theme.spacing(0, 2),
      borderTop: `1px solid ${theme.palette.divider}`,
      position: 'sticky',
      bottom: 0,
      backgroundColor: '#fff'
    }
  }),
  { name: 'OverlayDrawer' }
)

export function OverlayDrawer({
  isOpen,
  title,
  children,
  renderFooter,
  onClose
}: Props) {
  const classes = useStyles()

  return (
    <Drawer classes={classes} open={isOpen} onClose={onClose} anchor="right">
      <div className={classes.header}>
        <div>
          <Typography variant="h6" className={classes.headerTitle}>
            {title}
          </Typography>
        </div>

        <div>
          <IconButton onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>
        </div>
      </div>

      <div className={classes.body}>
        <div className={classes.content}>{children}</div>
        {renderFooter && <div className={classes.footer}>{renderFooter()}</div>}
      </div>
    </Drawer>
  )
}
