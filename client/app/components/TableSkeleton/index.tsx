import React from 'react'
import { TableRow, TableCell, TableBody } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

interface Props {
  columns: number
  rows: number
}

export function TableBodySkeleton({ columns, rows }: Props) {
  return (
    <TableBody>
      {new Array(rows).fill(null).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {new Array(columns).fill(null).map((__, colIndex) => (
            <TableCell key={colIndex} component="th" scope="row">
              <Skeleton variant="rect" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}
