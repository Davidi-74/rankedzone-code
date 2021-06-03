const { withStyles, TableCell } = require("@material-ui/core");


const StyledTableCell = withStyles(() => ({
    head: {
        background: "#353535",
        color: "white",
    },
    body: {
        color: "white",
        fontWeight: "bold"

    },
    root: {
        borderBottom: "none",
    }
}))(TableCell)

export default StyledTableCell