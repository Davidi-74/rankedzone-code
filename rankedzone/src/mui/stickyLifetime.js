import { makeStyles } from "@material-ui/core";

const isSticky = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('md')]: {
            position: "sticky",
            top: 0
        }
    }
}))

export default isSticky;