const { withStyles, TableRow } = require("@material-ui/core");


const StyledTableRow = withStyles(() => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: "#4d4d4d"
        }
    },
}))(TableRow);

export default StyledTableRow