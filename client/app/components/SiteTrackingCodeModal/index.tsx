import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  Tooltip,
  useTheme,
  Theme
} from '@material-ui/core'

import copy from 'clipboard-copy'
import { useSnackbar } from 'notistack'

interface Props {
  site: ISite
  onClose: () => void
}

export function SiteTrackingCodeModal({ site, onClose }: Props) {
  const theme = useTheme<Theme>()
  const { enqueueSnackbar } = useSnackbar()

  const code = `<script></script>`

  const handleCopy = () => {
    copy(code)
    enqueueSnackbar('The code is copied!', { variant: 'success' })
  }

  return (
    <Dialog keepMounted open onClose={onClose}>
      <DialogTitle>Install Recording Script</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Copy and paste the script below into the every page you wish to
          record.
        </Typography>

        <TextField
          multiline
          fullWidth
          rows={15}
          value={code}
          variant="outlined"
          style={{
            margin: theme.spacing(2, 0)
          }}
          InputProps={{
            readOnly: true
          }}
          onClick={handleCopy}
        />

        <Tooltip title="Coming soon!">
          <Button>Install from NPM</Button>
        </Tooltip>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}
