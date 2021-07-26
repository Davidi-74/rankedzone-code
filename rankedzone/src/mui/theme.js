const { createMuiTheme } = require("@material-ui/core");

const darkTheme = createMuiTheme({
    overrides: {
        MuiContainer: {
            root: {
                backgroundColor: "#212121",
                color: "#f7fbfc",
                textAlign: "center",
                fontFamily: "Calibri",
                fontSize: 20
            }
        },
        MuiButton: {
            root: {
                color: "#f7fbfc",
                '&.MuiButton-outlined': {
                    borderColor: "rgba(125,125,125,0.8)"
                }
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
                color: "#f7fbfc",
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
                backgroundColor: "white",
                margin: "4px",
                borderRadius: "4px"
            }
        },
        MuiSkeleton: {
            root: {
                borderRadius: "4px"
            }
        },
        MuiListItemIcon: {
            root: {
                minWidth: 0
            }
        }
    },
    props: {
        MuiContainer: {
            maxWidth: false
        },
        MuiButton: {
            variant: "outlined"
        },
        MuiTextField: {
            variant: "filled",
            size: "small"
        },
        MuiSelect: {
            variant: "filled"
        },
        MuiSkeleton: {
            animation: "wave",
            variant: "rect"
        }
    },
    palette: {
        primary: {
            main: "#FFFFFF"
        },
        secondary: {
            main: "#29b6f6"
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