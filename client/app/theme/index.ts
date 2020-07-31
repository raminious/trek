import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0B6E4F'
    },
    secondary: {
      main: '#073B3A'
    },
    background: {
      default: '#fff'
    },
    action: {
      hoverOpacity: 0.05
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#fff'
        },
        html: {
          WebkitFontSmoothing: 'auto'
        }
      }
    },
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

console.log(theme)
