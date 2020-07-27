import React from 'react'

import { Button } from '@material-ui/core'
import { useSnackbar } from 'notistack'

import { OverlayDrawer } from '@app/components/Drawer'

interface Props {
  site: ISite | null
  isOpen: boolean
  onClose: () => void
}

export function SiteDrawer({ site, isOpen, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar()

  const handleCreate = () => {
    enqueueSnackbar('Site created', { variant: 'success' })
  }

  return (
    <>
      <OverlayDrawer
        isOpen={isOpen}
        title="Add new Site"
        renderFooter={() => (
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Create
          </Button>
        )}
        onClose={onClose}
      >
        <div>
          {new Array(100).fill(null).map((_, i) => (
            <div key={i}>{i}</div>
          ))}
        </div>
      </OverlayDrawer>
    </>
  )
}
