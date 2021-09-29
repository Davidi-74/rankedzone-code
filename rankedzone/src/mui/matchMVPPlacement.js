import { makeStyles } from "@material-ui/core";

const placement = makeStyles({
    first: {
        height: "100%",
        width: "95%",
        margin: 0,
        textAlign: "center",
        color: "white",
        background: "linear-gradient(227deg, gold 0%, goldenrod 81%, goldenrod 100%, goldenrod 100%)",
        fontWeight: "bold",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    second: {
        height: "100%",
        width: "95%",
        margin: 0,
        color: "white",
        background: "linear-gradient(227deg, grey 0%, silver 81%, grey 100%, silver 100%)",
        fontWeight: "bold",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    third: {
        height: "100%",
        width: "95%",
        margin: 0,
        color: "white",
        background: "linear-gradient(227deg, #A46628 0%, #b68453 21%, #A46628 60%, #b68453 100%)",
        fontWeight: "bold",
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
})

export default placement