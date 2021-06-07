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
        width: "100%",
        margin: 0,
        textAlign: "center",
        background: 'linear-gradient(227deg, gold 0%, goldenrod 81%, goldenrod 100%, goldenrod 100%)',
        color: "white",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    second: {
        height: "100%",
        width: "100%",
        margin: 0,
        textAlign: "center",
        background: 'linear-gradient(150deg, grey 0%, silver 81%, dimgrey 100%, silver 100%)',
        color: "white",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    third: {
        height: "100%",
        width: "100%",
        margin: 0,
        textAlign: "center",
        background: 'linear-gradient(180deg, #A46628 0%, #b68453 21%, #A46628 60%, #b68453 100%)',
        color: "white",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
}))

export default placement;