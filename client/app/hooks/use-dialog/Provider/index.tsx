import React, { useState } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core'

import { DialogContext } from '../Context'
import type { Confirmation } from '../Context'

interface Props {
  children: React.ReactNode
}

export function DialogProvider({ children }: Props) {
  const [dialogOptions, setDialogOptions] = useState<Confirmation | null>(null)

  const handleConfirmation = (options: Confirmation) => {
    setDialogOptions(options)

    return null
  }

  const handleCancel = () => {
    setDialogOptions(null)
  }

  const handleConfirm = () => {
    setDialogOptions(null)

    if (dialogOptions?.onConfirm) {
      dialogOptions.onConfirm()
    }
  }

  return (
    <DialogContext.Provider
      value={{
        confirmation: handleConfirmation
      }}
    >
      {children}

      <Dialog
        open={!!dialogOptions}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {dialogOptions?.title && (
          <DialogTitle id="alert-dialog-title">
            {dialogOptions.title}
          </DialogTitle>
        )}
        <DialogContent>
          {dialogOptions?.description && (
            <DialogContentText id="alert-dialog-description">
              {dialogOptions.description}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            {dialogOptions?.cancelText ?? 'Cancel'}
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            variant="contained"
            autoFocus
          >
            {dialogOptions?.confirmText ?? 'Okay'}
          </Button>
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  )
}
