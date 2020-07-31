import React from 'react'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { theme } from './theme'

interface Props {
  children: React.ReactNode
}

export function ApplicationThemeProvider({ children }: Props) {
  return (
    <>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <>{children}</>
        </ThemeProvider>
      </StylesProvider>
    </>
  )
}
