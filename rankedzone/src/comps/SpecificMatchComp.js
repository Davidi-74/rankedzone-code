import { ButtonGroup, Container, Grid, Button, useMediaQuery, useTheme, Divider } from "@material-ui/core"
import { useEffect, useState } from "react"
import MatchMVPs from "./MatchMVPs";
import TeamComp from "./TeamComp";
import utils from './utils'
import sortButtons from '../mui/sortButtons'
import GroupedByPlayers from "./GroupedByPlayers";
import SpecificMatchSkel from "./skeletons/SpecificMatchSkel";
import Skeleton from '@material-ui/lab/Skeleton';
import LogoComp from './LogoComp'

const SpecificMatchComp = (props) => {
    const [matchID, setMatchID] = useState(props.match.params.matchID);
    const [uno, setUno] = useState(props.match.params.uno);
    const [teams, setTeams] = useState([]);
    const [matchData, setMatchData] = useState("");
    const [topTeamKills, setTopTeamKills] = useState(null);
    const [topPlayerKills, setTopPlayerKills] = useState(null);
    const [sort, setSort] = useState(["picked", "root", "root"])
    const theme = useTheme();
    const screenSize = useMediaQuery(theme.breakpoints.up('md'));
    const [groupBy, setGroupBy] = useState("teams");
    const [group, setGroup] = useState(["picked", "root"])
    const [groupSort, setGroupSort] = useState(["picked", "root"])
    const [teamComps, setTeamComps] = useState([]);
    const [players, setPlayers] = useState([]);

    const getMatch = async () => {
        let resp = await utils.getMatchDetails(matchID);
        console.log(resp);
        let obj = {
            utcStartSeconds: resp.utcStartSeconds,
            mode: resp.mode,
            playerCount: resp.playerCount
        }
        setTeams(resp.teams)
        setMatchData(obj);
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

    const createTeamsDesign = () => {
        const teamComps = teams.map((team, index) => {
            if (team.players.length != 0) {
                return <TeamComp key={team.players[0].team} mode={matchData.mode} team={team.players} teamStats={team.teamStats} uno={uno} />
            }
        })
        setTeamComps(teamComps);
    }

    const getPlayers = () => {
        let players = [];
        teams.forEach(team => players.push(...team.players));
        players = sortPlayersByKills(players)
        setPlayers(players);
    }

    const sortPlayersByKills = (players) => {
        const temp = players.sort((a, b) => {
            if (b.kills === a.kills) {
                return b.damageDone - a.damageDone;
            }
            return b.kills - a.kills
        })
        return temp;
    }

    const sortPlayersByDamage = (players) => {
        const temp = players.sort((a, b) => {
            if (b.damageDone === a.damageDone) {
                return b.kills - a.kills;
            }
            return b.damageDone - a.damageDone
        })
        return temp
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        getMatch();
    }, [matchID])

    useEffect(() => {
        createTeamsDesign();
        let teamKills = getTopTeamKills(teams);
        let playerKills = getTopPlayerKills(teams);
        setTopTeamKills(teamKills)
        setTopPlayerKills(playerKills)
    }, [teams])

    useEffect(() => {
        if (matchData.mode === "br_dmz_plnbld") {
            sortBy("kills")
            setSort(["root", "picked", "root"])
        }
    }, [matchData])

    const sortButtonsDesign = sortButtons();
    return (
        <Container>
            {
                teams.length > 0 ?
                    <Grid container direction="column" alignItems="stretch" jusity="center">
                        <Grid item xs={12}>
                            <LogoComp />
                        </Grid>
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
                            {topTeamKills != null ? <MatchMVPs teamKills={topTeamKills} mode={matchData.mode} uno={uno} playerKills={topPlayerKills} key={topTeamKills[0].players[0].team} /> : <Grid item xs={12}><Skeleton width={1463} height={37} /></Grid>}
                        </Grid>
                        <Grid container item xs={12} justify="center">
                            {
                                matchData.mode != "br_brsolo" ?
                                    <Grid container item xs={12} md={3} direction="column" justify="center" alignItems="center">
                                        <Grid item xs={12}>
                                            <h5 style={{ color: "#909090" }}>GROUP BY</h5>
                                        </Grid>
                                        <Grid container item xs={12} justify="center" alignItems="stretch">
                                            <ButtonGroup size="small" fullWidth>
                                                <Button className={sortButtonsDesign[group[0]]} onClick={() => { setGroupBy("teams"); setGroup(["picked", "root"]) }}>TEAMS</Button>
                                                <Button className={sortButtonsDesign[group[1]]} onClick={() => { if (players.length === 0) { getPlayers() }; setGroupBy("players"); setGroup(["root", "picked"]) }}>PLAYERS</Button>
                                            </ButtonGroup>
                                        </Grid>
                                    </Grid>
                                    :
                                    null
                            }
                            {
                                matchData.mode != "br_brsolo" ?
                                    <Grid container item xs={1} justify="center" alignItems="center">
                                        <Divider orientation="vertical" style={{ background: "#909090" }} />
                                    </Grid>
                                    :
                                    null
                            }
                            <Grid container item xs={12} md={3} direction="row" justify="center" alignItems="center">
                                <Grid item xs={12}>
                                    <h5 style={{ color: "#909090" }}>SORT BY</h5>
                                </Grid>
                                {
                                    groupBy === ("teams") ?
                                        <Grid container item xs={12} justify="center" alignItems="center">
                                            {
                                                matchData.mode !== "br_dmz_plnbld" ?
                                                    <ButtonGroup size="small" fullWidth>
                                                        <Button className={sortButtonsDesign[sort[0]]} onClick={() => { sortBy("teamPlacement"); setSort(["picked", "root", "root"]) }}>Placement</Button>
                                                        <Button className={sortButtonsDesign[sort[1]]} onClick={() => { sortBy("kills"); setSort(["root", "picked", "root"]) }}>Kills</Button>
                                                        <Button className={sortButtonsDesign[sort[2]]} onClick={() => { sortBy("damageDone"); setSort(["root", "root", "picked"]) }}>Damage</Button>
                                                    </ButtonGroup>
                                                    :
                                                    <ButtonGroup size="small" fullWidth>
                                                        <Button className={sortButtonsDesign[sort[1]]} onClick={() => { sortBy("kills"); setSort(["root", "picked", "root"]) }}>Kills</Button>
                                                        <Button className={sortButtonsDesign[sort[2]]} onClick={() => { sortBy("damageDone"); setSort(["root", "root", "picked"]) }}>Damage</Button>
                                                    </ButtonGroup>
                                            }
                                        </Grid>
                                        :
                                        <Grid container item xs={12} justify="center" alignItems="stretch">
                                            <ButtonGroup size="small" fullWidth>
                                                <Button className={sortButtonsDesign[groupSort[0]]}
                                                    onClick={() => {
                                                        let sorted = sortPlayersByKills(players)
                                                        setPlayers(sorted)
                                                        setGroupSort(["picked", "root"])
                                                    }}>
                                                    KILLS
                                                </Button>
                                                <Button className={sortButtonsDesign[groupSort[1]]}
                                                    onClick={() => {
                                                        let sorted = sortPlayersByDamage(players);
                                                        setPlayers(sorted)
                                                        setGroupSort(["root", "picked"])
                                                    }}>
                                                    DAMAGE
                                                </Button>
                                            </ButtonGroup>
                                        </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <br />
                            {
                                groupBy === "teams" ?
                                    teamComps
                                    :
                                    <GroupedByPlayers key={players[0].username} players={players} uno={uno} />
                            }
                        </Grid>
                    </Grid>
                    :
                    <SpecificMatchSkel />
            }
        </Container>
    )
}

export default SpecificMatchComp