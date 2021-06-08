import { makeStyles } from "@material-ui/core";

const helpOutlineDesign = makeStyles({
    root: {
        verticalAlign: "-8px",
        padding: "5px",
        borderRadius: "4px",
        "&:hover": {
            background: "#353535"
        }
    },
    tooltip: {
        background: "#212121",
        fontSize: "12px",
        fontWeight: "bold"
    }
})

export default helpOutlineDesign