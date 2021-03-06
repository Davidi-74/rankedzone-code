import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react"
import SessionSummaryWins from "./SessionSummaryWins";
import SingleStatComp from "./SingleStatComp";
import SessionSummarySkel from "./skeletons/SessionSummarySkel";

const SessionSummary = (props) => {
    const [session, setSession] = useState(props.session);
    const [sessionStats, setSessionStats] = useState(null)

    const summarizeSession = () => {
        let [deaths, killsPerGame, wins] = [0, 0, 0];
        session.forEach(match => {
            deaths += match.playerStats.deaths;
            killsPerGame += match.playerStats.kills;
            if (match.teamStats.placement === 1) {
                wins++;
            }
        });
        let kdRatio = killsPerGame / deaths;
        killsPerGame = killsPerGame / session.length;
        let obj = { kdRatio, killsPerGame, wins };
        setSessionStats(obj);
    }

    useEffect(() => {
        summarizeSession();
    }, [session])

    return (
        <div>
            {
                sessionStats !== null ?
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={12} style={{ width: "300px" }}>
                            <h4 style={{ color: "white" }}>
                                {session.length === 1 ? session.length + " MATCH" : session.length + " MATCHES IN A ROW"}
                            </h4>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <SessionSummaryWins wins={sessionStats.wins} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <SingleStatComp statType="kd" stat={sessionStats.kdRatio} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <SingleStatComp statType="killsPerGame" stat={sessionStats.killsPerGame} />
                        </Grid>
                    </Grid>
                    :
                    <SessionSummarySkel />
            }
        </div>
    )
}

export default SessionSummary