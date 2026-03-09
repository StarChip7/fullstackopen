import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#256af4',
    },
    background: {
      default: '#f5f6f8',
      primary: '#E2E8F0',
    },
  },
  shape: {
    borderRadius: 8,
  },
})

export default theme