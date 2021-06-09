import { ButtonGroup, Container, Grid, Button, useMediaQuery, useTheme } from "@material-ui/core"
import { useEffect, useState } from "react"
import MatchMVPs from "./MatchMVPs";
import TeamComp from "./TeamComp";
import utils from './utils'
import sortButtons from '../mui/sortButtons'

const SpecificMatchComp = (props) => {
    const [matchID, setMatchID] = useState(props.match.params.matchID);
    const [uno, setUno] = useState(props.match.params.uno);
    const [teams, setTeams] = useState([]);
    const [matchData, setMatchData] = useState("");
    const [topTeamKills, setTopTeamKills] = useState(null);
    const [topPlayerKills, setTopPlayerKills] = useState(null);
    const [sort, setSort] = useState(["picked", "", ""])
    const theme = useTheme();
    const screenSize = useMediaQuery(theme.breakpoints.up('md'));

    const getMatch = async () => {
        let resp = await utils.getMatchDetails(matchID);
        console.log(resp);
        let obj = {
            utcStartSeconds: resp.utcStartSeconds,
            mode: resp.mode,
            playerCount: resp.playerCount
        }
        setMatchData(obj);
        setTeams(resp.teams)
    }

    const getTopTeamKills = (teams) => {
        if (teams.length > 0) {
            let teamsCopy = [...teams];
            let sorted = teamsCopy.sort((a, b) => {
                if (b.teamStats.kills === a.teamStats.kills) {
                    return b.teamStats.damageDone - a.teamStats.damageDone
                }
                return b.teamStats.kills - a.teamStats.kills;
            })
            return sorted.slice(0, 3);
        }
    }

    const getTopPlayerKills = (teams) => {
        if (teams.length > 0) {
            let players = [];
            teams.forEach(team => {
                let temp = players.concat(team.players);
                players = temp;
            })
            players.sort((a, b) => {
                if (b.kills === a.kills) {
                    return b.damageDone - a.damageDone;
                }
                return b.kills - a.kills
            })
            return players.slice(0, 3);
        }
    }

    const sortBy = (prop) => {
        let teamsCopy = [...teams];
        teamsCopy.sort((a, b) => {
            if (prop === "teamPlacement") {
                return a.players[0][prop] - b.players[0][prop];
            }
            else {
                if (b.teamStats.kills === a.teamStats.kills) {
                    return b.teamStats.damageDone - a.teamStats.damageDone
                }
                return b.teamStats[prop] - a.teamStats[prop];
            }
        })
        setTeams(teamsCopy)
    }

    useEffect(() => {
        getMatch();
    }, [matchID])

    useEffect(() => {
        let teamKills = getTopTeamKills(teams);
        let playerKills = getTopPlayerKills(teams);
        setTopTeamKills(teamKills)
        setTopPlayerKills(playerKills)
    }, [teams])

    const sortButtonsDesign = sortButtons();
    return (
        <Container>
            {
                teams.length > 0 ?
                    <Grid container direction="column" alignItems="stretch" jusity="center">
                        <Grid item xs={12}>
                            {
                                screenSize ?
                                    <h2 style={{ marginBottom: "0" }}>{utils.modeName(matchData.mode)}</h2>
                                    : <h4 style={{ marginBottom: "0" }}>{utils.modeName(matchData.mode)}</h4>
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <h5>{utils.formatDate(matchData.utcStartSeconds)}</h5>
                        </Grid>
                        <Grid item xs={12} >
                            {topTeamKills != null ? <MatchMVPs teamKills={topTeamKills} mode={matchData.mode} uno={uno} playerKills={topPlayerKills} key={topTeamKills[0].players[0].team} /> : ""}
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{ marginBottom: "5px" }}>
                                <h5 style={{ marginTop: "5px", marginBottom: "10px", color: "#909090" }}>SORT BY</h5>
                                <ButtonGroup size="small">
                                    <Button className={sortButtonsDesign[sort[0]]} style={{ width: "93px" }} onClick={() => { sortBy("teamPlacement"); setSort(["picked", "", ""]) }}>Placement</Button>
                                    <Button className={sortButtonsDesign[sort[1]]} style={{ width: "93px" }} onClick={() => { sortBy("kills"); setSort(["", "picked", ""]) }}>Kills</Button>
                                    <Button className={sortButtonsDesign[sort[2]]} style={{ width: "93px" }} onClick={() => { sortBy("damageDone"); setSort(["", "", "picked"]) }}>Damage</Button>
                                </ButtonGroup>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            {
                                teams.map((team, index) => {
                                    if (team.players.length != 0) {
                                        return <TeamComp key={team.players[0].team} mode={matchData.mode} team={team.players} teamStats={team.teamStats} uno={uno} />
                                    }
                                })
                            }
                        </Grid>
                    </Grid>
                    :
                    ""
            }
        </Container>
    )
}

export default SpecificMatchComp