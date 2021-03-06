import { Grid, Paper } from "@material-ui/core"
import { useEffect, useState } from "react"
import utils from './utils'
import MiniMatchSummary from './MiniMatchSummary'
import SessionSummary from "./SessionSummary"
import Skeleton from '@material-ui/lab/Skeleton';

const MatchesComp = (props) => {
    const [matches, setMatches] = useState([]);
    const [userData, setUserData] = useState("");

    const getMatches = async () => {
        let data = await utils.getMatches(decodeURIComponent(props.username), props.platform);
        console.log(data);
        setUserData({ uno: data.uno, username: data.username, clantag: data.clantag ? data.clantag : null });
        setMatches(splitToSessions(data.matches));
    }

    const splitToSessions = (matches) => {
        let prevTime = 0;
        let sessions = [];
        let currentSession = [];
        matches.forEach((match, index) => {
            if (index === 0) {
                prevTime = match.utcStartSeconds;
                currentSession.push(match)
            }
            else if (prevTime - match.utcStartSeconds < 7200) {
                prevTime = match.utcStartSeconds;
                currentSession.push(match)
            }
            else {
                prevTime = match.utcStartSeconds;
                sessions.push(currentSession);
                currentSession = [];
                currentSession.push(match)
            }
        })
        sessions.push(currentSession);
        return (sessions)
    }

    useEffect(() => {
        getMatches();
    }, [])

    return (
        <div>
            <h3>Last 20 Matches</h3>
            {
                matches.length !== 0 ?
                    matches.map((session, index) => {
                        let matches = session.map((match) => {
                            return <MiniMatchSummary key={match.matchID} uno={userData.uno} matchData={match} />
                        })

                        return (
                            <Paper style={{ background: "#272727" }}>
                                <Grid container direction="row" justify="center" alignItems="center">
                                    <Grid container item direction="row" justify="center" alignItems="center" xs={12} >
                                        <SessionSummary key={"session" + index} session={session} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        {matches}
                                    </Grid>
                                </Grid>
                            </Paper>
                        )
                    })
                    :
                    <Grid container alignItems="center" justify="center">
                        <Skeleton variant="rect" height={1000} width="98%" />
                    </Grid>
            }
        </div>
    )
}

export default MatchesComp