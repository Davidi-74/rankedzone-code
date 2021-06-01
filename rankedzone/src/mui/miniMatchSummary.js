import { makeStyles } from "@material-ui/core";

const miniMatchSummary = makeStyles({
    root: {
        width: "-webkit-fill-available",
        margin: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        color: "white",
        "&:hover": {
            backgroundColor: "rgba(0,0,0,0.4)"
        }
    }
})

export default miniMatchSummary