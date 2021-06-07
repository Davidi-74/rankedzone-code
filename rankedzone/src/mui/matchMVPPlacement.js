import { makeStyles } from "@material-ui/core";

const placement = makeStyles({
    first: {
        color: "white",
        background: "linear-gradient(227deg, gold 0%, goldenrod 81%, goldenrod 100%, goldenrod 100%)",
        fontWeight: "bold"
    },
    second: {
        color: "white",
        background: "linear-gradient(227deg, grey 0%, silver 81%, dimgrey 100%, silver 100%)",
        fontWeight: "bold"
    },
    third: {
        color: "white",
        background: "linear-gradient(227deg, #A46628 0%, #b68453 21%, #A46628 60%, #b68453 100%)",
        fontWeight: "bold"
    }
})

export default placement