import { Container, Grid } from "@material-ui/core"
import SpecificRankedStat from "./SpecificRankedStat"

const HowWeRank = (props) => {

    return (
        <Container>
            <Grid container direction="row" alignItems="center" justify="center" style={{ marginBottom: "100px" }}>
                <Grid item xs={12}>
                    <h1>HOW WE RANK</h1>
                </Grid>
                <Grid container item xs={12} md={6} direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <h3>K/D RATIO</h3>
                    </Grid>
                    <Grid item xs={12} style={{ width: "90%" }}>
                        <SpecificRankedStat statType="kd" />
                    </Grid>
                </Grid>
                <Grid container item xs={12} md={6} direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <h3>KILLS</h3>
                    </Grid>
                    <Grid item xs={12} style={{ width: "90%" }}>
                        <SpecificRankedStat statType="kills" />
                    </Grid>
                </Grid>
                <Grid container item xs={12} md={6} direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <h3>WEEKLY KILLS</h3>
                    </Grid>
                    <Grid item xs={12} style={{ width: "90%" }}>
                        <SpecificRankedStat statType="weeklyKills" />
                    </Grid>
                </Grid>
                <Grid container item xs={12} md={6} direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <h3>WINS</h3>
                    </Grid>
                    <Grid item xs={12} style={{ width: "90%" }}>
                        <SpecificRankedStat statType="wins" />
                    </Grid>
                </Grid>
                <Grid container item xs={12} md={6} direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <h3>% WINS</h3>
                    </Grid>
                    <Grid item xs={12} style={{ width: "90%" }}>
                        <SpecificRankedStat statType="winPercentage" />
                    </Grid>
                </Grid>
                <Grid container item xs={12} md={6} direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <h3>KILLS PER GAME</h3>
                    </Grid>
                    <Grid item xs={12} style={{ width: "90%" }}>
                        <SpecificRankedStat statType="killsPerGame" />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default HowWeRank