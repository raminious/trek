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

import { getTrackingCode } from './helpers/get-code'

interface Props {
  isOpen: boolean
  site: ISite | null
  onClose: () => void
}

export function SiteTrackingCodeModal({ isOpen, site, onClose }: Props) {
  const theme = useTheme<Theme>()
  const { enqueueSnackbar } = useSnackbar()
  const snippet = getTrackingCode(site)

  const handleCopy = () => {
    copy(snippet)
    enqueueSnackbar('The code is copied!', { variant: 'success' })
  }

  return (
    <Dialog keepMounted open={isOpen} onClose={onClose}>
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
          defaultValue={snippet}
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
