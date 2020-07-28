import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#114B5F'
    },
    secondary: {
      main: '#456990'
    }
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#262626',
        padding: '0.25rem 0.5rem',
        fontSize: '0.875rem',
        fontWeight: 500
      },
      arrow: {
        color: '#262626'
      }
    }
  },
  props: {
    MuiTooltip: {
      arrow: true
    }
  }
})
