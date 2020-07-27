import React from 'react'
import {
  Drawer,
  makeStyles,
  Theme,
  Typography,
  IconButton
} from '@material-ui/core'

import CloseRoundedIcon from '@material-ui/icons/CloseRounded'

export * from './Footer'

interface Props {
  isOpen: boolean
  title: string
  children: React.ReactNode
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
      flexGrow: 1,
      padding: theme.spacing(2, 2, 0, 2),
      '& form': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexBasis: '100%',
        maxHeight: '100%'
      }
    },
    content: {
      padding: theme.spacing(2)
    }
  }),
  { name: 'OverlayDrawer' }
)

export function OverlayDrawer({ isOpen, title, children, onClose }: Props) {
  const classes = useStyles()

  return (
    <Drawer
      classes={{
        modal: classes.modal,
        paper: classes.paper
      }}
      open={isOpen}
      onClose={onClose}
      anchor="right"
    >
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

      <div className={classes.body}>{children}</div>
    </Drawer>
  )
}
