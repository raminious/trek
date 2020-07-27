import React from 'react'

import { Button, TextField } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'

import * as yup from 'yup'

import { OverlayDrawer, OverlayDrawerFooter } from '@app/components/Drawer'

interface IFormInputs {
  name: string
  domain: number
}

interface Props {
  site: ISite | null
  isOpen: boolean
  onClose: () => void
}

const schema = yup.object().shape({
  name: yup.string().min(3).max(15).required(),
  domain: yup.string().url().required()
})

export function SiteDrawer({ site, isOpen, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar()
  const { handleSubmit, register, errors } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  })

  const onSubmit = (values: IFormInputs) => {
    enqueueSnackbar('Site created', { variant: 'success' })
  }

  return (
    <>
      <OverlayDrawer isOpen={isOpen} title="Add new Site" onClose={onClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              name="name"
              label="Name"
              style={{ margin: 8 }}
              placeholder="My awesome website"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
              inputRef={register}
            />

            <TextField
              name="domain"
              label="Domain"
              style={{ margin: 8 }}
              placeholder="https://"
              fullWidth
              margin="normal"
              error={!!errors.domain}
              helperText={
                errors.domain
                  ? errors.domain.message
                  : 'Starts with https:// or http://'
              }
              inputRef={register}
            />
          </div>

          <OverlayDrawerFooter>
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
          </OverlayDrawerFooter>
        </form>
      </OverlayDrawer>
    </>
  )
}
