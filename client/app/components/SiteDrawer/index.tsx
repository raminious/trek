import React from 'react'
import { useDeepCompareEffect } from 'react-use'

import { Button, TextField } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'

import * as yup from 'yup'

import { OverlayDrawer, OverlayDrawerFooter } from '@app/components/Drawer'
import { useCreateSite } from '@app/hooks/site/use-create-site'
import { useUpdateSite } from '@app/hooks/site/use-update-site'

interface IFormInputs {
  name: string
  domain: string
}

interface Props {
  site: ISite | null
  isOpen: boolean
  onClose: () => void
  onCreate: (site: ISite) => void
  onUpdate: () => void
}

const schema = yup.object().shape({
  name: yup.string().min(3).max(15).required(),
  domain: yup.string().required()
})

export function SiteDrawer({
  site,
  isOpen,
  onCreate,
  onUpdate,
  onClose
}: Props) {
  const { enqueueSnackbar } = useSnackbar()
  const updateSite = useUpdateSite()
  const createSite = useCreateSite()

  const defaultValues = {
    name: site?.name ?? '',
    domain: site?.domain ?? ''
  }

  const { handleSubmit, register, errors, formState, reset } = useForm<
    IFormInputs
  >({
    defaultValues,
    resolver: yupResolver(schema)
  })

  useDeepCompareEffect(() => {
    if (isOpen) {
      reset(defaultValues)
    }
  }, [isOpen, defaultValues])

  const handleUpdateSite = async ({ name, domain }: Partial<IFormInputs>) => {
    try {
      await updateSite(site!, {
        name,
        domain
      })

      onUpdate()

      enqueueSnackbar('Site updated', { variant: 'success' })
    } catch (e) {
      enqueueSnackbar('Could not update site. try again', { variant: 'error' })
    }
  }

  const handleCreateSite = async ({ name, domain }: IFormInputs) => {
    try {
      const {
        data: {
          SiteCreateOne: { record }
        }
      } = await createSite({ name, domain })

      onCreate(record)

      enqueueSnackbar('Site created', { variant: 'success' })
    } catch (e) {
      enqueueSnackbar(e.message || 'Could not create site. try again', {
        variant: 'error'
      })
    }
  }

  const onSubmit = async ({ name, domain }: IFormInputs) => {
    if (site) {
      await handleUpdateSite({ name, domain })
      return
    }

    await handleCreateSite({ name, domain })
  }

  return (
    <>
      <OverlayDrawer
        isOpen={isOpen}
        title={site ? `Update "${site.name}"` : 'Add new Site'}
        onClose={onClose}
      >
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={formState.isSubmitting}
            >
              {site ? 'Update' : 'Create'}
            </Button>
          </OverlayDrawerFooter>
        </form>
      </OverlayDrawer>
    </>
  )
}
