import { Box, Button, Grid, Paper } from "@material-ui/core"
import { useState } from "react"
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const MatchMVPs = (props) => {
    const [teamKills, setTeamKills] = useState(props.teamKills)
    const [showComp, setShowComp] = useState(false);
    console.log(teamKills);
    return (
        <div>
            <Button onClick={() => setShowComp(!showComp)}>
                {showComp ? <Box>Match MVP's <ExpandLessIcon style={{ verticalAlign: "middle" }} /></Box> : <Box>Match MVP's <ExpandMoreIcon style={{ verticalAlign: "middle" }} /></Box>}
            </Button>
            <Box display={showComp ? "flex" : "none"}>
                <Grid container>
                    <Paper>
                        team 1: {teamKills[0].teamStats.kills}
                        team 2: {teamKills[1].teamStats.kills}
                        team 3: {teamKills[2].teamStats.kills}
                    </Paper>
                </Grid>
            </Box>
        </div>
    )
}

export default MatchMVPs