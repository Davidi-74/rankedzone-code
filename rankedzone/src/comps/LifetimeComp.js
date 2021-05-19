import { Box, Container, Grid, Paper } from "@material-ui/core"
import { useEffect, useState } from "react"
import utils from './utils'

const LifetimeComp = (props) => {
    const [stats, setStats] = useState("");

    const getLifetimeStats = async () => {
        let temp = await utils.getLifetimeStats(decodeURIComponent(props.username), props.platform);
        setStats(temp);
    }

    useEffect(() => {
        getLifetimeStats();
    }, [])

    const secondsToDhms = (seconds) => {
        seconds = Number(seconds);
        let d = Math.floor(seconds / (3600 * 24));
        let h = Math.floor(seconds % (3600 * 24) / 3600);
        let m = Math.floor(seconds % 3600 / 60);

        let dDisplay = d > 0 ? d + (d == 1 ? " Day, " : " Days, ") : "";
        let hDisplay = h > 0 ? h + (h == 1 ? " Hour, " : " Hours, ") : "";
        let mDisplay = m > 0 ? m + (m == 1 ? " Minute" : " Minutes") : "";
        return dDisplay + hDisplay + mDisplay;
    }

    console.log(stats);
    return (
        <Container>
            Lifetime Battle Royale Stats <br />
            <Box>
                {stats != "" ?
                    <Grid container>
                        <Grid item xs={12}>
                            <Paper>
                                KD Ratio: {stats.lifetime.kdRatio.toFixed(2)} <br />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                Kills: {stats.lifetime.kills} <br />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                Deaths: {stats.lifetime.deaths} <br />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                Matches: {stats.lifetime.gamesPlayed} <br />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                Wins: {stats.lifetime.wins} <br />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                Top Five: {stats.lifetime.topFive} <br />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                Top Ten: {stats.lifetime.topTen} <br />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                Downs: {stats.lifetime.downs} <br />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                Revives: {stats.lifetime.revives} <br />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                Contracts: {stats.lifetime.contracts} <br />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper>
                                Time Played: {secondsToDhms(stats.lifetime.timePlayed)} <br />
                            </Paper>
                        </Grid>
                    </Grid> : ""}
            </Box>
        </Container>
    )
}

export default LifetimeComp