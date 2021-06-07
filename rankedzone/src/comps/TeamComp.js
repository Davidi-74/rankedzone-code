import { Paper, Grid, TableContainer, TableHead, TableRow, TableBody, Table } from "@material-ui/core"
import { useEffect, useState } from "react"
import placement from '../mui/tablePlacementPaper'
import StyledTableCell from '../mui/styledTableCell'
import StyledTableRow from '../mui/styledTableRow'
import utils from './utils'
import teamCompDesign from '../mui/teamCompDesign'

const TeamComp = (props) => {
    const [team, setTeam] = useState(props.team);
    const [teamPlacement, setTeamPlacement] = useState(props.placement);
    const [teamStats, setTeamStats] = useState(props.teamStats);
    const [uno, setUno] = useState(props.uno);
    const [specificTeam, setSpecificTeam] = useState("general");
    const [mode, setMode] = useState(props.mode);

    const placementStyle = placement();
    const placementColor = (placement) => {
        if (placement === 1) {
            return placementStyle.first;
        }
        if (placement === 2) {
            return placementStyle.second;
        }
        if (placement === 3) {
            return placementStyle.third;
        }
        return placementStyle.other
    }

    const isSpecificPlayer = () => {
        let unoExists = false;
        team.forEach(player => {
            if (player.uno === uno) {
                unoExists = true;
            }
        })
        if (unoExists) {
            setSpecificTeam("specific")
        }
    }

    useEffect(() => {
        isSpecificPlayer();
    }, [])

    const teamPaper = teamCompDesign();
    return (
        <Paper className={teamPaper[specificTeam]} elevation={10}>
            {
                team.length > 0 ?
                    <Grid container direction="row" justify="flex-start" alignItems="stretch">
                        <Grid item xs={2} sm={1}>
                            <Paper className={placementColor(teamPlacement + 1)} elevation={0}>
                                {utils.ordinalNumbers(teamPlacement + 1)}
                            </Paper>
                        </Grid>
                        <Grid container item xs={10} sm={11} direction="column" justify="center" alignItems="flex-start">
                            <TableContainer >
                                <Table style={{ minWidth: 650 }} aria-label="a dense table">
                                    <TableHead>
                                        <StyledTableRow>
                                            <StyledTableCell align="center" style={{ width: "200px" }}></StyledTableCell>
                                            <StyledTableCell align="center" >KILLS</StyledTableCell>
                                            <StyledTableCell align="center">DEATHS</StyledTableCell>
                                            <StyledTableCell align="center">DAMAGE DONE</StyledTableCell>
                                            <StyledTableCell align="center">DAMAGE TAKEN</StyledTableCell>
                                            <StyledTableCell align="center" style={{ borderTopRightRadius: "3px" }}>% HEADSHOTS</StyledTableCell>
                                        </StyledTableRow>
                                    </TableHead>
                                    <TableBody>
                                        {team.map((player) => {
                                            return <StyledTableRow key={player.username} style={{ borderBottomRightRadius: "3px" }}>
                                                <StyledTableCell component="th" scope="row" >
                                                    {player.clantag ? "[" + player.clantag + "] " + player.username : player.username}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{player.kills}</StyledTableCell>
                                                <StyledTableCell align="center">{player.deaths}</StyledTableCell>
                                                <StyledTableCell align="center">{player.damageDone.toLocaleString()}</StyledTableCell>
                                                <StyledTableCell align="center">{player.damageTaken.toLocaleString()}</StyledTableCell>
                                                <StyledTableCell align="center">{player.kills != 0 ? (player.headshots / player.kills * 100).toFixed(2) + "%" : "0.00%"}</StyledTableCell>
                                            </StyledTableRow>
                                        })}
                                    </TableBody>
                                    {mode != "br_brsolo" ?
                                        <TableHead>
                                            <StyledTableRow>
                                                <StyledTableCell component="th" scope="row" >
                                                    TEAM SUMMARY
                                            </StyledTableCell>
                                                <StyledTableCell align="center">{teamStats.kills}</StyledTableCell>
                                                <StyledTableCell align="center">{teamStats.deaths}</StyledTableCell>
                                                <StyledTableCell align="center">{teamStats.damageDone.toLocaleString()}</StyledTableCell>
                                                <StyledTableCell align="center">{teamStats.damageTaken.toLocaleString()}</StyledTableCell>
                                                <StyledTableCell align="center" style={{ borderBottomRightRadius: "3px" }}>{teamStats.kills != 0 ? (teamStats.headshots / teamStats.kills * 100).toFixed(2) + "%" : "0.00%"}</StyledTableCell>
                                            </StyledTableRow>
                                        </TableHead>
                                        : ""}
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    :
                    ""
            }
        </Paper>
    )
}

export default TeamComp