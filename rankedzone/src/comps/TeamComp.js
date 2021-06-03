import { Paper, Grid, TableContainer, TableHead, TableRow, TableBody, Table } from "@material-ui/core"
import { useState } from "react"
import placement from '../mui/tablePlacementPaper'
import StyledTableCell from '../mui/styledTableCell'
import StyledTableRow from '../mui/styledTableRow'
import utils from './utils'

const TeamComp = (props) => {
    const [team, setTeam] = useState(props.team);
    const [teamPlacement, setTeamPlacement] = useState(props.placement);

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

    return (
        <Paper style={{ background: "#707070", color: "white" }}>
            {
                team.length > 0 ?
                    <Grid container direction="row" justify="flex-start" alignItems="stretch">
                        <Grid item xs={1}>
                            <Paper className={placementColor(teamPlacement + 1)} elevation={0}>
                                {utils.ordinalNumbers(teamPlacement + 1)}
                            </Paper>
                        </Grid>
                        <Grid container item xs={11} direction="column" justify="center" alignItems="flex-start">
                            <TableContainer >
                                <Table style={{ minWidth: 650 }} aria-label="a dense table">
                                    <TableHead>
                                        <StyledTableRow>
                                            <StyledTableCell align="center" style={{ width: "200px" }}></StyledTableCell>
                                            <StyledTableCell align="center" >KILLS</StyledTableCell>
                                            <StyledTableCell align="center">DEATHS</StyledTableCell>
                                            <StyledTableCell align="center">DAMAGE DONE</StyledTableCell>
                                            <StyledTableCell align="center">DAMAGE TAKEN</StyledTableCell>
                                            <StyledTableCell align="center">HEADSHOTS</StyledTableCell>
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
                                                <StyledTableCell align="center">{player.headshots}</StyledTableCell>
                                                <StyledTableCell align="center" style={{ borderBottomRightRadius: "3px" }}>{player.kills != 0 ? (player.headshots / player.kills * 100).toFixed(2) + "%" : "0.00%"}</StyledTableCell>
                                            </StyledTableRow>
                                        })}
                                    </TableBody>
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