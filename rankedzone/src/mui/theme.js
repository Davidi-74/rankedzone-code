const { createMuiTheme } = require("@material-ui/core");

const darkTheme = createMuiTheme({
    overrides: {
        MuiContainer: {
            root: {
                backgroundColor: "#212121",
                color: "#f7fbfc",
                textAlign: "center",
                fontFamily: "Calibri",
                fontSize: 20,
                height: "100vh",
                display: "flex",
                flexDirection: "column"
            }
        },
        MuiButton: {
            root: {
                color: "#f7fbfc"
            }
        },
        MuiInputLabel: {
            root: {
                color: "#f7fbfc",
            },
        },
        MuiFilledInput: {
            root: {
                color: "#f7fbfc",
            },
        },
        MuiSelect: {
            root: {
                color: "#f7fbfc"
            },
            icon: {
                color: "#f7fbfc"
            }
        },
        MuiMenuItem: {
            root: {
                color: "#f7fbfc"
            }
        },
        MuiPaper: {
            root: {
                backgroundColor: "#212121"
            }
        }
    },
    props: {
        MuiContainer: {
            maxWidth: false
        },
        MuiButton: {
            variant: "contained"
        },
        MuiTextField: {
            variant: "filled",
            size: "small"
        },
        MuiSelect: {
            variant: "filled"
        }
    },
    palette: {
        primary: {
            main: "#FFFFFF"
        }
    }
})

const lightTheme = createMuiTheme({
    overrides: {
        MuiContainer: {
            root: {
                backgroundColor: "yellow",
                color: "#f7fbfc",
                textAlign: "center",
                fontFamily: "Calibri",
                fontSize: 20,
                height: "100vh",
                display: "flex",
                flexDirection: "column"
            }
        }
    },
    props: {
        MuiContainer: {
            maxWidth: false
        }
    }
})

export { lightTheme, darkTheme };