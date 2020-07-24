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
import { useTitle } from 'react-use'

import TuneRoundedIcon from '@material-ui/icons/TuneRounded'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded'
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded'

import { PageHeader } from '@app/components/PageHeader'
import { useDialog } from '@app/hooks/use-dialog'

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: '100%'
  },
  title: {
    fontWeight: 500
  },
  settingsIcon: {
    fontSize: theme.spacing(3)
  }
}))

function createData(name: string, domain: string) {
  return { name, domain }
}

export default function WebsitesPage() {
  useTitle('Trek | Websites')
  const classes = useStyles()
  const dialog = useDialog()

  const rows = [
    createData('Production', 'https://my-awesome-website.com'),
    createData('Beta', 'https://beta.my-awesome-website.com')
  ]

  const handleDelete = () => {
    dialog.confirmation({
      title: 'Are you sure you want delete this site?',
      description:
        "It will delete forever and you won't be able to undo this action",
      confirmText: 'Confirm',
      onConfirm: () => alert('')
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
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <Typography variant="body1" className={classes.title}>
                    {row.name}
                  </Typography>
                </TableCell>

                <TableCell component="th" scope="row">
                  <Typography variant="body1">
                    <a href={row.domain} target="_blank" rel="noreferrer">
                      {row.domain}
                    </a>
                  </Typography>
                </TableCell>

                <TableCell component="th" scope="row">
                  <FormControlLabel
                    control={<Switch color="primary" checked />}
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
                    <IconButton onClick={handleDelete}>
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
