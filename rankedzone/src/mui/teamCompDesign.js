import { makeStyles } from "@material-ui/core";

const teamCompDesign = makeStyles({
    general: {
        background: "#707070",
        marginBottom: "10px"
    },
    specific: {
        background: "#707070",
        marginBottom: "10px",
        "& > *": {
            boxShadow:
                "0px 3px 1px 0px #29b6f6, 0px 0px 3px 3px #29b6f6 ,0px 0px 15px 3px #29b6f6",
            borderRadius: "3px"
        }
    }
})

export default teamCompDesign