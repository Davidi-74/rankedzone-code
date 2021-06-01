import { Box, Button, Container, Grid, Paper } from "@material-ui/core"
import { useEffect, useState } from "react"
import SingleStatComp from "./SingleStatComp";
import utils from './utils'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PlainStatComp from "./PlainStatComp";

const LifetimeComp = (props) => {
    const [stats, setStats] = useState("");
    const [otherStats, setOtherStats] = useState(false);

    const getLifetimeStats = async () => {
        let temp = await utils.getLifetimeStats(decodeURIComponent(props.username), props.platform);
        setStats(temp);
    }

    useEffect(() => {
        getLifetimeStats();
    }, [])

    console.log(stats);
    return (
        <Box>
            <h3>Lifetime BR Stats</h3>
            <Box width="100%">
                {stats != "" ?
                    <Grid container>
                        <Grid item xs={12}>
                            <SingleStatComp statType="kd" stat={stats.lifetime.kdRatio} />
                        </Grid>
                        <Grid item xs={6}>
                            <SingleStatComp statType="kills" stat={stats.lifetime.kills} />
                        </Grid>
                        <Grid item xs={6}>
                            <SingleStatComp statType="killsPerGame" stat={stats.lifetime.kills / stats.lifetime.gamesPlayed} />
                        </Grid>
                        <Grid item xs={6}>
                            <SingleStatComp statType="wins" stat={stats.lifetime.wins} />
                        </Grid>
                        <Grid item xs={6}>
                            <SingleStatComp statType="winPercentage" stat={stats.lifetime.wins / stats.lifetime.gamesPlayed * 100} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button style={{ width: "97%" }} onClick={() => { setOtherStats(!otherStats) }} variant="outlined">
                                {otherStats ? <Box >Other Stats <ExpandLessIcon style={{ verticalAlign: "middle" }} /></Box> : <Box >Other Stats <ExpandMoreIcon style={{ verticalAlign: "middle" }} /></Box>}
                            </Button>
                        </Grid>
                        <Box display={otherStats ? "flex" : "none"} width="100%">
                            <Grid container>
                                <Grid item xs={6}>
                                    <PlainStatComp statType="matches" stat={stats.lifetime.gamesPlayed} />
                                </Grid>
                                <Grid item xs={6}>
                                    <PlainStatComp statType="deaths" stat={stats.lifetime.deaths} />
                                </Grid>
                                <Grid item xs={6}>
                                    <PlainStatComp statType="topFive" stat={stats.lifetime.topFive} />
                                </Grid>
                                <Grid item xs={6}>
                                    <PlainStatComp statType="topTen" stat={stats.lifetime.topTen} />
                                </Grid>
                                <Grid item xs={6}>
                                    <PlainStatComp statType="downs" stat={stats.lifetime.downs} />
                                </Grid>
                                <Grid item xs={6}>
                                    <PlainStatComp statType="revives" stat={stats.lifetime.revives} />
                                </Grid>
                                <Grid item xs={6}>
                                    <PlainStatComp statType="contracts" stat={stats.lifetime.contracts} />
                                </Grid>
                                <Grid item xs={6}>
                                    <PlainStatComp statType="score" stat={stats.lifetime.score} />
                                </Grid>
                                <Grid item xs={12}>
                                    <PlainStatComp statType="timePlayed" stat={stats.lifetime.timePlayed} />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid> : ""}
            </Box>
        </Box>
    )
}

export default LifetimeComp