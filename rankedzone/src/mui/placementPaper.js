import { makeStyles } from "@material-ui/core";

const placement = makeStyles((theme) => ({
    other: {
        [theme.breakpoints.up('md')]: {
            height: "175px",
            lineHeight: "135px"
        },
        [theme.breakpoints.only('xs')]: {
            height: "250px",
            lineHeight: "210px",
            paddingLeft: "5px"
        },
        width: "60px",
        margin: 0,
        textAlign: "center",
        background: 'linear-gradient(90deg,rgba(14,13,13, 0.6) 10%, rgba(255, 255, 255, 0))',
        color: "white",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    first: {
        [theme.breakpoints.up('md')]: {
            height: "175px",
            lineHeight: "135px"
        },
        [theme.breakpoints.only('xs')]: {
            height: "250px",
            lineHeight: "210px",
            paddingLeft: "5px"
        }, width: "60px",
        margin: 0,
        textAlign: "center",
        background: 'linear-gradient(90deg, rgba(214, 175, 54, 0.6) 10%, rgba(255, 255, 255, 0))',
        color: "white",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    second: {
        [theme.breakpoints.up('md')]: {
            height: "175px",
            lineHeight: "135px"
        },
        [theme.breakpoints.only('xs')]: {
            height: "250px",
            lineHeight: "210px",
            paddingLeft: "5px"
        }, width: "60px",
        margin: 0,
        textAlign: "center",
        background: 'linear-gradient(90deg, rgba(167, 167, 173, 0.6) 10%, rgba(255, 255, 255, 0))',
        color: "white",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    third: {
        [theme.breakpoints.up('md')]: {
            height: "175px",
            lineHeight: "135px"
        },
        [theme.breakpoints.only('xs')]: {
            height: "250px",
            lineHeight: "210px",
            paddingLeft: "5px"
        }, width: "60px",
        margin: 0,
        textAlign: "center",
        background: 'linear-gradient(90deg, rgba(167, 112, 68, 0.6) 10%, rgba(255, 255, 255, 0))',
        color: "white",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    }
}))

export default placement;