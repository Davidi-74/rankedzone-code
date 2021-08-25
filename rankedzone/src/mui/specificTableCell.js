const { withStyles, TableCell } = require("@material-ui/core");

const SpecificTableCell = withStyles(() => ({
    body: {
        color: "#29b6f6",
        fontWeight: "bold"
    },
    root: {
        borderBottom: "none",
    }
}))(TableCell)

export default SpecificTableCell