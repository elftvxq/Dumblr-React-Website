export default {
    palette: {
        primary: {
            light: '#33c9dc',
            // main: '#00bcd4',
            main: '#14213D',
            dark: '#008394',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff6333',
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#fff'
        },
    },
    typography: {
        useNextVariants: true
    },
    spreadIt: {
        form: {
            textAlign: 'center'
        },
        image: {
            margin: '20px auto 20px auto'
        },
        textField: {
            margin: '10px auto 10px auto',
        },
        pageTitle:{
            margin: '10px auto 10px auto'
        },
        button: {
            marginTop: 20,
            position: 'relative'

        },
        customError: {
            color: 'red',
            fontSize: '0.8rem'
        },
        progress: {
            position: 'absolute'
        }
    },
    invisibleSeperator: {
        border: 'none',
        margin: 4
    },
    visibleSeperator: {
        width: '100%',
        borderBottom: '1px solid rbga(0, 0, 0, 0.1)',
        marginBottom: 20
    }
};