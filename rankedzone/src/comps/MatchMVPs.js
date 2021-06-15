import { Box, Button, Grid, Paper } from "@material-ui/core"
import { useState } from "react"
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import placement from '../mui/matchMVPPlacement'

const MatchMVPs = (props) => {
    const [teamKills, setTeamKills] = useState(props.teamKills)
    const [playerKills, setPlayerKills] = useState(props.playerKills)
    const [showComp, setShowComp] = useState(false);
    const [uno, setUno] = useState(props.uno)
    const [mode, setMode] = useState(props.mode);

    const teammates = (teamNum) => {
        let teammatesString = "";
        for (let i = 0; i < teamKills[teamNum].players.length; i++) {
            if (i != teamKills[teamNum].players.length - 1) {
                teammatesString = teammatesString + teamKills[teamNum].players[i].username + ", ";
            }
            else {
                teammatesString = teammatesString + teamKills[teamNum].players[i].username
            }
        }
        return teammatesString;
    }

    const specificTeammates = (players) => {
        let flag = false
        players.forEach(player => {
            if (player.uno == uno) {
                flag = true;
            }
        })
        if (flag) {
            return "#29b6f6"
        }
    }

    const placementDesign = placement();
    return (
        <Paper style={{ background: "#353535", marginBottom: "10px" }}>
            <Button onClick={() => setShowComp(!showComp)} fullWidth>
                {showComp ? <Box>Match MVPs <ExpandLessIcon style={{ verticalAlign: "middle" }} /></Box> : <Box>Match MVPs <ExpandMoreIcon style={{ verticalAlign: "middle" }} /></Box>}
            </Button>
            <Box display={showComp ? "flex" : "none"} >
                <Grid container>
                    {
                        mode != "br_brsolo" ?
                            <Grid item xs={12} md={6}>
                                <Paper elevation={0} style={{ marginBottom: "10px" }}>
                                    <Grid container direction="row" alignItems="stretch" justify="flex-start">
                                        <Grid item xs={12}>
                                            <Grid container direction="column" alignItems="center" justify="center" style={{ color: "white", background: "#353535" }}>
                                                <Grid container item xs={12} alignItems="center" justify="center" style={{ background: "#353535", borderTopRightRadius: 0, borderTopLeftRadius: 0 }}>
                                                    <h4 style={{ margin: 8 }}>
                                                        TOP TEAM KILLS
                                                    </h4>
                                                </Grid>
                                                <Grid container item xs={12} direction="row" alignItems="center" justify="flex-start" style={{ background: "#4d4d4d", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>
                                                    <Grid item xs={1} >
                                                        <Paper className={placementDesign.first}>
                                                            1
                                                        </Paper>
                                                    </Grid>
                                                    <Grid container item xs={10} justify="flex-start" alignItems="center" style={{ height: "50px" }} >
                                                        <Box textAlign="left" paddingLeft="5px" maxWidth="90%" color={specificTeammates(teamKills[0].players)}>
                                                            {teammates(0)}
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        {teamKills[0].teamStats.kills}
                                                    </Grid>
                                                </Grid>
                                                <Grid container item xs={12} direction="row" alignItems="center" justify="flex-start" style={{ background: "#707070" }}>
                                                    <Grid item xs={1}>
                                                        <Paper className={placementDesign.second}>
                                                            2
                                                        </Paper>
                                                    </Grid>
                                                    <Grid container item xs={10} justify="flex-start" alignItems="center" style={{ height: "50px" }} >
                                                        <Box textAlign="left" paddingLeft="5px" maxWidth="90%" color={specificTeammates(teamKills[1].players)}>
                                                            {teammates(1)}
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        {teamKills[1].teamStats.kills}
                                                    </Grid>
                                                </Grid>
                                                <Grid container item xs={12} direction="row" alignItems="center" justify="flex-start" style={{ background: "#4d4d4d", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px" }}>
                                                    <Grid item xs={1}>
                                                        <Paper className={placementDesign.third}>
                                                            3
                                                        </Paper>
                                                    </Grid>
                                                    <Grid container item xs={10} justify="flex-start" alignItems="center" style={{ height: "50px" }}>
                                                        <Box textAlign="left" paddingLeft="5px" maxWidth="90%" color={specificTeammates(teamKills[2].players)}>
                                                            {teammates(2)}
                                                        </Box>
                                                    </Grid>
                                                    <Grid item xs={1}>
                                                        {teamKills[2].teamStats.kills}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            : ""
                    }
                    <Grid item xs={12} md={mode != "br_brsolo" ? 6 : 12}>
                        <Paper elevation={0} style={{ marginBottom: "10px" }}>
                            <Grid container direction="row" alignItems="stretch" justify="flex-start">
                                <Grid item xs={12}>
                                    <Grid container direction="column" alignItems="center" justify="center" style={{ color: "white", background: "#353535" }}>
                                        <Grid container item xs={12} alignItems="center" justify="center" style={{ background: "#353535", borderTopRightRadius: 0, borderTopLeftRadius: 0 }}>
                                            <h4 style={{ margin: 8 }}>
                                                TOP PLAYER KILLS
                                            </h4>
                                        </Grid>
                                        <Grid container item xs={12} direction="row" alignItems="center" justify="flex-start" style={{ background: "#4d4d4d", borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>
                                            <Grid item xs={1}>
                                                <Paper className={placementDesign.first}>
                                                    1
                                                </Paper>
                                            </Grid>
                                            <Grid container item xs={10} justify="flex-start" alignItems="center" style={{ height: "50px" }} >
                                                <Box textAlign="left" paddingLeft="5px" color={playerKills[0].uno === uno ? "#29b6f6" : ""}>
                                                    {playerKills[0].username}
                                                </Box>
                                            </Grid>
                                            <Grid item xs={1}>
                                                {playerKills[0].kills}
                                            </Grid>
                                        </Grid>
                                        <Grid container item xs={12} direction="row" alignItems="center" justify="flex-start" style={{ background: "#707070" }}>
                                            <Grid item xs={1}>
                                                <Paper className={placementDesign.second}>
                                                    2
                                                </Paper>
                                            </Grid>
                                            <Grid container item xs={10} justify="flex-start" alignItems="center" style={{ height: "50px" }} >
                                                <Box textAlign="left" paddingLeft="5px" color={playerKills[1].uno === uno ? "#29b6f6" : ""} >
                                                    {playerKills[1].username}
                                                </Box>
                                            </Grid>
                                            <Grid item xs={1}>
                                                {playerKills[1].kills}
                                            </Grid>
                                        </Grid>
                                        <Grid container item xs={12} direction="row" alignItems="center" justify="flex-start" style={{ background: "#4d4d4d", borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px" }}>
                                            <Grid item xs={1}>
                                                <Paper className={placementDesign.third}>
                                                    3
                                                </Paper>
                                            </Grid>
                                            <Grid container item xs={10} justify="flex-start" alignItems="center" style={{ height: "50px" }}>
                                                <Box textAlign="left" paddingLeft="5px" color={playerKills[2].uno === uno ? "#29b6f6" : ""}>
                                                    {playerKills[2].username}
                                                </Box>
                                            </Grid>
                                            <Grid item xs={1}>
                                                {playerKills[2].kills}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}

export default MatchMVPs