import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'


// Create our Light (original) theme 💡
export default createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#cc4444',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#f5f5f5',
        },
    },
})