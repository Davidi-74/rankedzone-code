import { Box, Container, Grid, MenuItem, Paper, Select } from "@material-ui/core"
import { useEffect, useState } from "react"
import SingleStatComp from "./SingleStatComp";
import utils from './utils'
import { homepagePlatforms } from '../mui/homepagePlatforms'
import PlainStatComp from "./PlainStatComp";

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
        if (mode == "all") {
            return "All Modes"
        }
        if (mode == "brSolo") {
            return "BR Solo"
        }
        if (mode == "brDous") {
            return "BR Dous"
        }
        if (mode == "brTrios") {
            return "BR Trios"
        }
        if (mode == "brQuads") {
            return "BR Quads"
        }
        if (mode == "resurgenceDous") {
            return "Resurgence Dous"
        }
        if (mode == "resurgenceTrios") {
            return "Resurgence Trios"
        }
        if (mode == "resurgenceQuads") {
            return "Resurgence Quads"
        }
        if (mode == "rebirthDous") {
            return "Rebirth Dous"
        }
        if (mode == "rebirthTrios") {
            return "Rebirth Trios"
        }
        if (mode == "rebirthQuads") {
            return "Rebirth Quads"
        }
    }

    const selectList = () => {
        if (optionalModes) {
            let modes = optionalModes.map((mode) => {
                return <MenuItem value={mode}>{formatModeName(mode)}</MenuItem>
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
        <div>
            <h3 style={{ color: "white" }}>
                Weekly Battle Royale Stats for&nbsp;
                    <Select MenuProps={{
                    classes: { paper: selectDesign.root },
                    anchorOrigin: { vertical: "bottom", horizontal: "left" },
                    transformOrigin: { vertical: "top", horizontal: "left" },
                    getContentAnchorEl: null,
                }}
                    defaultValue="all"
                    variant="outlined"
                    style={{ width: "175px", height: "44px", textAlign: "left", fontSize: "20px", fontWeight: "bold" }}
                    onChange={(e) => setCurrentMode(e.target.value)}>
                    {selectList()}
                </Select>
            </h3>
            {
                stats != "" ?
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
                    : ""
            }
        </div >
    )
}

export default WeeklyComp