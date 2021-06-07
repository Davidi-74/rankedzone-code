import { Container, Grid } from "@material-ui/core"
import { useEffect, useState } from "react"
import MatchMVPs from "./MatchMVPs";
import TeamComp from "./TeamComp";
import utils from './utils'

const SpecificMatchComp = (props) => {
    const [matchID, setMatchID] = useState(props.match.params.matchID);
    const [uno, setUno] = useState(props.match.params.uno);
    const [teams, setTeams] = useState([]);
    const [matchData, setMatchData] = useState("");
    const [topTeamKills, setTopTeamKills] = useState(null);
    const [topPlayerKills, setTopPlayerKills] = useState(null);
    console.log(123);

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

    useEffect(() => {
        let teamKills = getTopTeamKills(teams);
        let playerKills = getTopPlayerKills(teams);
        setTopTeamKills(teamKills)
        setTopPlayerKills(playerKills)

    }, [teams])

    useEffect(() => {
        getMatch();
    }, [matchID])

    return (
        <Container>
            <Grid container direction="column" alignItems="stretch" jusity="center">
                <Grid item xs={12}>
                    <h2 style={{ marginBottom: "0" }}>{utils.modeName(matchData.mode)}</h2>
                </Grid>
                <Grid item xs={12}>
                    <h5>{utils.formatDate(matchData.utcStartSeconds)}</h5>
                </Grid>
                <Grid item xs={12} >
                    {topTeamKills != null ? <MatchMVPs teamKills={topTeamKills} mode={matchData.mode} uno={uno} playerKills={topPlayerKills} key={topTeamKills[0].players[0].team} /> : ""}
                </Grid>
                <Grid item xs={12}>
                    {
                        teams.length > 0 ?
                            teams.map((team, index) => {
                                if (team.players.length != 0) {
                                    return <TeamComp key={team.players[0].team} mode={matchData.mode} team={team.players} teamStats={team.teamStats} placement={index} uno={uno} />
                                }
                            })
                            : ""
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

export default SpecificMatchComp