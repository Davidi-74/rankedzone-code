import { Paper, Box } from "@material-ui/core";
import { useState } from "react"
import sessionSummaryWins from "../mui/sessionSummaryWin";


const SessionSummaryWins = (props) => {
    const [wins, setWins] = useState(props.wins);
    console.log(wins);
    const winDesign = sessionSummaryWins();
    return (
        <Paper className={wins > 0 ? winDesign.win : winDesign.noWin}>
            <Box style={{ color: "white", borderTopLeftRadius: "3px", borderTopRightRadius: "3px" }} fontWeight="bolder">Wins</Box>
            <Box fontSize="30px" style={{ background: "white" }}>
                {wins}
            </Box>
            <Box style={{ color: "white", fontSize: "14px", borderBottomRightRadius: "3px", borderBottomLeftRadius: "3px" }} fontWeight="bolder">&nbsp;</Box>
        </Paper>
    )
}

export default SessionSummaryWins