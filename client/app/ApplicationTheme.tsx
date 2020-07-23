import React from 'react'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { theme } from './theme'

interface Props {
  children: React.ReactNode
}

export function ApplicationTheme({ children }: Props) {
  return (
    <>
      <CssBaseline />
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <>{children}</>
        </ThemeProvider>
      </StylesProvider>
    </>
  )
}
