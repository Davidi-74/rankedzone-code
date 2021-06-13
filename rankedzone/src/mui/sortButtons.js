import { makeStyles } from "@material-ui/core";

const sortButtons = makeStyles({
    picked: {
        background: "#707070",
        "&:hover": {
            background: "#656565"
        },
        width: "12vh"
    },
    root: {
        width: "12vh"
    }
})

export default sortButtons