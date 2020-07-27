import React from 'react'

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

import { useQuery, useMutation } from '@apollo/client'

import TuneRoundedIcon from '@material-ui/icons/TuneRounded'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded'

import {
  GET_ALL_SITES_QUERY,
  UPDATE_SITE_STATUS_MUTATION,
  DELETE_SITE_MUTATION
} from '@app/graphql/site'

import { PageHeader } from '@app/components/PageHeader'
import { useDialog } from '@app/hooks/use-dialog'
import { TableBodySkeleton } from '@app/components/TableSkeleton'

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: '100%'
  },
  title: {
    fontWeight: 500
  },
  settingsIcon: {
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

  const { loading, error, data } = useQuery<ISiteQueryData>(GET_ALL_SITES_QUERY)
  const [updateSiteStatus] = useMutation(UPDATE_SITE_STATUS_MUTATION)
  const [deleteSite] = useMutation(DELETE_SITE_MUTATION)

  const handleDelete = (site: ISite) => {
    deleteSite({
      variables: {
        id: site._id
      },
      update(
        proxy,
        {
          data: {
            SiteRemoveById: { record }
          }
        }: {
          data: ISiteMutationData
        }
      ) {
        const data: ISiteQueryData | null = proxy.readQuery({
          query: GET_ALL_SITES_QUERY
        })

        proxy.writeQuery({
          query: GET_ALL_SITES_QUERY,
          data: {
            SiteMany: data?.SiteMany.filter(site => site._id !== record._id)
          }
        })
      }
    })
  }

  const toggleSiteStatus = (site: ISite, checked: boolean) => {
    updateSiteStatus({
      variables: {
        id: site._id,
        status: checked
      },
      optimisticResponse: {
        __typename: 'Mutation',
        SiteUpdateById: {
          record: {
            ...site,
            isActive: checked
          }
        }
      }
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

  return (
    <div>
      <PageHeader title="Sites">
        <Button
          color="primary"
          variant="contained"
          startIcon={<AddBoxRoundedIcon />}
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
                      label="Active"
                    />
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Tooltip title="Settings">
                      <IconButton>
                        <TuneRoundedIcon className={classes.settingsIcon} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete forever">
                      <IconButton onClick={() => requestDelete(site)}>
                        <DeleteRoundedIcon className={classes.settingsIcon} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
