import { makeStyles } from "@material-ui/core";

const placement = makeStyles({
    other: {
        height: "150px",
        width: "60px",
        margin: 0,
        lineHeight: "125px",
        textAlign: "center",
        background: 'linear-gradient(90deg,rgba(0,0,0, 0.9) 15%, rgba(255, 255, 255, 0))',
        color: "white",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    first: {
        height: "150px",
        width: "60px",
        margin: 0,
        lineHeight: "125px",
        textAlign: "center",
        background: 'linear-gradient(90deg, rgba(214, 175, 54, 0.8) 15%, rgba(255, 255, 255, 0))',
        color: "white",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    second: {
        height: "150px",
        width: "60px",
        margin: 0,
        lineHeight: "125px",
        textAlign: "center",
        background: 'linear-gradient(45deg, rgba(167, 167, 173), rgba(255, 255, 255, 0.5))',
        color: "white",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    third: {
        height: "150px",
        width: "60px",
        margin: 0,
        lineHeight: "125px",
        textAlign: "center",
        background: 'linear-gradient(90deg, rgba(167, 112, 68, 0.8) 15%, rgba(255, 255, 255, 0))',
        color: "white",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    }
})

export default placement;