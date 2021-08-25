import { Grid, MenuItem, Select } from "@material-ui/core"
import { useEffect, useState } from "react"
import SingleStatComp from "./SingleStatComp";
import utils from './utils'
import { homepagePlatforms } from '../mui/homepagePlatforms'
import PlainStatComp from "./PlainStatComp";
import WeeklyCompSkel from "./skeletons/WeeklyCompSkel";

const WeeklyComp = (props) => {
    const [stats, setStats] = useState("");
    const [currentMode, setCurrentMode] = useState("all");
    const [optionalModes, setOptionalModes] = useState(null);

    const getWeeklyStats = async () => {
        let temp = await utils.getWeeklyStats(decodeURIComponent(props.username), props.platform);
        setStats(temp);
    }

    const getOptionalModes = () => {
        let modes = [];
        console.log(stats.weekly);
        if (stats.weekly) {
            Object.keys(stats.weekly).forEach(mode => {
                if (stats.weekly[mode]) {
                    modes.push(mode);
                }
            })
        }
        setOptionalModes(modes);
    }

    const formatModeName = (mode) => {
        switch (mode) {
            case "all": return "All Modes"
            case "brSolo": return "BR Solo"
            case "brDous": return "BR Dous"
            case "brTrios": return "BR Trios"
            case "brQuads": return "BR Quads"
            case "resurgenceDous": return "Resurgence Dous"
            case "resurgenceTrios": return "Resurgence Trios"
            case "resurgenceQuads": return "Resurgence Quads"
            case "rebirthDous": return "Rebirth Dous"
            case "rebirthTrios": return "Rebirth Trios"
            case "rebirthQuads": return "Rebirth Quads"
            default: return null
        }
    }

    const selectList = () => {
        if (optionalModes) {
            let modes = optionalModes.map((mode) => {
                return <MenuItem key={mode} value={mode}>{formatModeName(mode)}</MenuItem>
            })
            return modes
        }
    }

    useEffect(() => {
        getWeeklyStats();
    }, [])

    useEffect(() => {
        getOptionalModes();
    }, [stats])

    const selectDesign = homepagePlatforms();
    return (
        <div >
            <h3 style={{ color: "white" }}>
                Weekly Battle Royale Stats for&nbsp;
                <Select MenuProps={{
                    classes: { paper: selectDesign.root },
                    anchorOrigin: { vertical: "bottom", horizontal: "left" },
                    transformOrigin: { vertical: "top", horizontal: "left" },
                    getContentAnchorEl: null
                }}
                    defaultValue="all"
                    variant="outlined"
                    style={{ width: "175px", height: "44px", textAlign: "left", fontSize: "20px", fontWeight: "bold" }}
                    onChange={(e) => setCurrentMode(e.target.value)}>
                    {selectList()}
                </Select>
            </h3>
            {
                stats !== "" ?
                    <Grid container direction="row">
                        <Grid item xs={12} md={4}>
                            <SingleStatComp key={stats.weekly[currentMode].kdRatio} statType="kd" stat={stats.weekly[currentMode].kdRatio} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <SingleStatComp key={stats.weekly[currentMode].kills} statType="weeklyKills" stat={stats.weekly[currentMode].kills} />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <SingleStatComp key={stats.weekly[currentMode].killsPerGame} statType="killsPerGame" stat={stats.weekly[currentMode].killsPerGame} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <PlainStatComp key={stats.weekly[currentMode].damageDone} statType={"damageDone"} stat={stats.weekly[currentMode].damageDone} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <PlainStatComp key={stats.weekly[currentMode].damageTaken} statType={"damageTaken"} stat={stats.weekly[currentMode].damageTaken} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <PlainStatComp key={stats.weekly[currentMode].headshots} statType={"headshots"} stat={stats.weekly[currentMode].headshots} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <PlainStatComp key={stats.weekly[currentMode].headshotPercentage} statType={"headshotPercentage"} stat={stats.weekly[currentMode].headshotPercentage} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <PlainStatComp key={stats.weekly[currentMode].timePlayed} statType={"timePlayed"} stat={stats.weekly[currentMode].timePlayed} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <PlainStatComp key={stats.weekly[currentMode].avgLifetime} statType={"avgLifetime"} stat={stats.weekly[currentMode].avgLifetime} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <PlainStatComp key={stats.weekly[currentMode].deaths} statType={"deaths"} stat={stats.weekly[currentMode].deaths} />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <PlainStatComp key={stats.weekly[currentMode].score} statType={"score"} stat={stats.weekly[currentMode].score} />
                        </Grid>
                    </Grid>
                    :
                    <WeeklyCompSkel />
            }
        </div >
    )
}

export default WeeklyComp