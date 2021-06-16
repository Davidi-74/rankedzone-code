import { Table, TableBody, TableContainer, TableHead, Paper } from "@material-ui/core";
import { useState } from "react"
import StyledTableCell from '../mui/styledTableCell'
import StyledTableRow from '../mui/styledTableRow'
import SpecificTableCell from '../mui/specificTableCell'

const GroupedByPlayers = (props) => {
    const [players, setPlayers] = useState(props.players)
    const [uno, setUno] = useState(props.uno);

    return (
        <Paper style={{ background: "#707070" }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="center" style={{ width: "200px" }}></StyledTableCell>
                            <StyledTableCell align="center" >KILLS</StyledTableCell>
                            <StyledTableCell align="center">DEATHS</StyledTableCell>
                            <StyledTableCell align="center">DAMAGE DONE</StyledTableCell>
                            <StyledTableCell align="center">DAMAGE TAKEN</StyledTableCell>
                            <StyledTableCell align="center" style={{ borderTopRightRadius: "4px" }}>% HEADSHOTS</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {
                            players.length > 0 ?
                                players.map((player) => {
                                    return (

                                        player.uno === uno ?
                                            <StyledTableRow key={player.username} style={{ borderBottomRightRadius: "3px" }}>
                                                <SpecificTableCell component="th" scope="row" >
                                                    {player.clantag ? "[" + player.clantag + "] " + player.username : player.username}
                                                </SpecificTableCell>
                                                <SpecificTableCell align="center">{player.kills}</SpecificTableCell>
                                                <SpecificTableCell align="center">{player.deaths}</SpecificTableCell>
                                                <SpecificTableCell align="center">{player.damageDone.toLocaleString()}</SpecificTableCell>
                                                <SpecificTableCell align="center">{player.damageTaken.toLocaleString()}</SpecificTableCell>
                                                <SpecificTableCell align="center">{player.kills != 0 ? (player.headshots / player.kills * 100).toFixed(2) + "%" : "0.00%"}</SpecificTableCell>
                                            </StyledTableRow>

                                            :
                                            <StyledTableRow key={player.username} style={{ borderBottomRightRadius: "3px" }}>
                                                <StyledTableCell component="th" scope="row" >
                                                    {player.clantag ? "[" + player.clantag + "] " + player.username : player.username}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{player.kills}</StyledTableCell>
                                                <StyledTableCell align="center">{player.deaths}</StyledTableCell>
                                                <StyledTableCell align="center">{player.damageDone.toLocaleString()}</StyledTableCell>
                                                <StyledTableCell align="center">{player.damageTaken.toLocaleString()}</StyledTableCell>
                                                <StyledTableCell align="center">{player.kills != 0 ? (player.headshots / player.kills * 100).toFixed(2) + "%" : "0.00%"}</StyledTableCell>
                                            </StyledTableRow>
                                    )
                                })
                                :
                                ""
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default GroupedByPlayers