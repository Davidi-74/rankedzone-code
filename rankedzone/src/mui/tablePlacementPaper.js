import { makeStyles } from "@material-ui/core";

const placement = makeStyles((theme) => ({
    other: {
        height: "100%",
        width: "95%",
        margin: 0,
        textAlign: "center",
        background: 'linear-gradient(90deg,rgba(14,13,13, 0.6) 10%, rgba(255, 255, 255, 0))',
        color: "white",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    first: {
        height: "100%",
        width: "95%",
        margin: 0,
        textAlign: "center",
        background: 'linear-gradient(90deg, rgba(214, 175, 54, 0.6) 10%, rgba(255, 255, 255, 0))',
        color: "white",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    second: {
        height: "100%",
        width: "95%",
        margin: 0,
        textAlign: "center",
        background: 'linear-gradient(90deg, rgba(167, 167, 173, 0.6) 10%, rgba(255, 255, 255, 0))',
        color: "white",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    third: {
        height: "100%",
        width: "95%",
        margin: 0,
        textAlign: "center",
        background: 'linear-gradient(90deg, rgba(167, 112, 68, 0.6) 10%, rgba(255, 255, 255, 0))',
        color: "white",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
}))

export default placement;