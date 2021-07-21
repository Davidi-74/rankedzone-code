import { Box, Button, Grid, Tooltip, ButtonBase } from "@material-ui/core"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import SingleStatComp from "./SingleStatComp";
import utils from './utils'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PlainStatComp from "./PlainStatComp";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import helpOutlineDesign from '../mui/helpOutlineDesign'
import LifetimeCompSkel from './skeletons/LifetimeCompSkel'

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

    const helpDesign = helpOutlineDesign();
    return (
        <Box style={{ paddingTop: "3.5px" }}>
            <h3 style={{ paddingBottom: "9px" }}>
                Lifetime BR Stats&nbsp;
                <Tooltip title="HOW WE RANK" classes={{ tooltip: helpDesign.tooltip }}>
                    <ButtonBase component={Link} to="/rankedzonebuild/ranking" onClick={(e) => { e.preventDefault(); window.open("/ranking") }}>
                        <HelpOutlineIcon fontSize="small" className={helpDesign.root} />
                    </ButtonBase>
                </Tooltip>
            </h3>
            <Box width="100%">
                {stats != "" ?
                    <Grid container direction="row" justify="center" alignItems="stretch">
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
                            <Button style={{ width: "98.2%" }} onClick={() => { setOtherStats(!otherStats) }} >
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
                    </Grid>
                    :
                    <LifetimeCompSkel />}
            </Box>
        </Box>
    )
}

export default LifetimeComp