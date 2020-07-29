import React, { useState } from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
  FormControlLabel,
  Typography,
  Tooltip,
  Button
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

import { useTitle } from 'react-use'

import { useQuery } from '@apollo/client'

import TuneRoundedIcon from '@material-ui/icons/TuneRounded'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded'
import CodeRoundedIcon from '@material-ui/icons/CodeRounded'

import { GET_ALL_SITES_QUERY } from '@app/graphql/site'

import { useDeleteSite } from '@app/hooks/site/use-delete-site'
import { useUpdateSite } from '@app/hooks/site/use-update-site'

import { PageHeader } from '@app/components/PageHeader'
import { useDialog } from '@app/hooks/use-dialog'
import { TableBodySkeleton } from '@app/components/TableSkeleton'
import { SiteDrawer } from '@app/components/SiteDrawer'
import { SiteTrackingCodeModal } from '@app/components/SiteTrackingCodeModal'

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: '100%'
  },
  title: {
    fontWeight: 500
  },
  icon: {
    fontSize: theme.spacing(3)
  },
  alert: {
    marginBottom: theme.spacing(2)
  }
}))

export default function WebsitesPage() {
  useTitle('Trek | Websites')
  const classes = useStyles()
  const dialog = useDialog()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedSite, setSelectedSite] = useState<ISite | null>(null)
  const [showTrackingCode, setShowTrackingCode] = useState(false)

  const { loading, error, data } = useQuery<ISiteQueryData>(GET_ALL_SITES_QUERY)
  const updateSite = useUpdateSite()
  const deleteSite = useDeleteSite()

  const handleOpenSiteDrawer = (site: ISite) => {
    setIsDrawerOpen(true)
    setSelectedSite(site)
  }

  const handleDelete = (site: ISite) => {
    deleteSite(site._id)
  }

  const toggleSiteStatus = (site: ISite, checked: boolean) => {
    updateSite(site, {
      isActive: checked
    })
  }

  const requestDelete = (site: ISite) => {
    dialog.confirmation({
      title: 'Are you sure you want delete this site?',
      description:
        "It will delete forever and you won't be able to undo this action",
      confirmText: 'Confirm',
      onConfirm: () => handleDelete(site)
    })
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setSelectedSite(null)
  }

  const handleOpenTrackingCodeModal = (site: ISite) => {
    setShowTrackingCode(true)
    setSelectedSite(site)
  }

  const handleCloseTrackingCodeModal = () => {
    setShowTrackingCode(false)
    setSelectedSite(null)
  }

  const onCreateSite = (site: ISite) => {
    setIsDrawerOpen(false)
    setShowTrackingCode(true)
    setSelectedSite(site)
  }

  const onUpdateSite = () => {
    handleCloseDrawer()
  }

  return (
    <div>
      <PageHeader title="Sites">
        <Button
          color="primary"
          variant="contained"
          startIcon={<AddBoxRoundedIcon />}
          onClick={() => setIsDrawerOpen(true)}
        >
          Add new website
        </Button>
      </PageHeader>

      {error && (
        <Alert severity="error" className={classes.alert}>
          Unable to fetch sites
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="websites">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Domain</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>

          {loading && <TableBodySkeleton columns={4} rows={10} />}

          <TableBody>
            {!loading &&
              data?.SiteMany.map(site => (
                <TableRow key={site._id}>
                  <TableCell component="th" scope="row">
                    <Typography variant="body1" className={classes.title}>
                      {site.name}
                    </Typography>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Typography variant="body1">
                      <a href={site.domain} target="_blank" rel="noreferrer">
                        {site.domain}
                      </a>
                    </Typography>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <FormControlLabel
                      control={
                        <Switch
                          color="primary"
                          checked={site.isActive}
                          onChange={(_, checked) =>
                            toggleSiteStatus(site, checked)
                          }
                        />
                      }
                      label="Recording"
                    />
                  </TableCell>

                  <TableCell component="th" scope="row" align="right">
                    <Tooltip title="Settings">
                      <IconButton onClick={() => handleOpenSiteDrawer(site)}>
                        <TuneRoundedIcon className={classes.icon} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Tracking Script">
                      <IconButton
                        onClick={() => handleOpenTrackingCodeModal(site)}
                      >
                        <CodeRoundedIcon className={classes.icon} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete forever">
                      <IconButton onClick={() => requestDelete(site)}>
                        <DeleteRoundedIcon className={classes.icon} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <SiteDrawer
        isOpen={isDrawerOpen}
        site={selectedSite}
        onClose={handleCloseDrawer}
        onCreate={onCreateSite}
        onUpdate={onUpdateSite}
      />

      {showTrackingCode && !!selectedSite && (
        <SiteTrackingCodeModal
          site={selectedSite}
          onClose={handleCloseTrackingCodeModal}
        />
      )}
    </div>
  )
}
