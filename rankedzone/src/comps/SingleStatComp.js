import { Paper, Box, Tooltip } from "@material-ui/core"
import { useEffect, useState } from "react"
import utils from './utils'
import ranking from '../mui/rankingDesign'
import nextRankTooltip from '../mui/nextRankTooltip'

const SingleStatComp = (props) => {
    const [statType, setStatType] = useState(props.statType);
    const [stat, setStat] = useState(props.stat);
    const [design, setDesign] = useState("");
    const [nextLevel, setNextLevel] = useState("MAX RANK");

    const getDesign = () => {
        let designData = utils.getRankingDesign(statType, stat);
        setDesign(designData.design);
        if (designData.nextLevel) {
            setNextLevel(formatNextLevel(designData.nextLevel))
        }
    }

    const displayStat = (stat) => {
        switch (stat) {
            case "kd": return "K/D Ratio"
            case "kills": return "Kills"
            case "weeklyKills": return "Kills"
            case "wins": return "Wins"
            case "winPercentage": return "% Wins"
            case "killsPerGame": return "Kills / Game"
        }
    }

    const formatNextLevel = (nextLevel) => {
        const nextLevelName = nextLevel[0].toUpperCase();
        if (statType === "kd" || statType === "killsPerGame") {
            return nextLevel[1].toFixed(2) + " 🠖 " + nextLevelName;
        }
        if (statType === "winPercentage") {
            return nextLevel[1].toFixed(2) + "%" + " 🠖 " + nextLevelName;
        }
        return nextLevel[1].toLocaleString() + " 🠖 " + nextLevelName;
    }

    useEffect(() => {
        getDesign();
    }, [])

    useEffect(() => {
        getDesign();
    }, [stat])

    const rankingDesign = ranking();
    const tooltipDesign = nextRankTooltip();
    return (
        <Tooltip title={nextLevel} classes={{ tooltip: tooltipDesign[design] }} >
            <Paper className={rankingDesign[design]} elevation={3}>
                <Box style={{ color: "white", borderTopLeftRadius: "3px", borderTopRightRadius: "3px" }} fontWeight="bolder">{displayStat(statType)}</Box>
                <Box fontSize="30px" style={{ background: "white" }}>
                    {statType === "kd" || statType === "killsPerGame" ? stat.toFixed(2) : statType === "winPercentage" ? stat.toFixed(2) + "%" : stat.toLocaleString()}
                </Box>
                <Box style={{ color: "white", fontSize: "14px", borderBottomRightRadius: "3px", borderBottomLeftRadius: "3px" }} fontWeight="bolder">{design == "default" ? "" : design.toUpperCase()}</Box>
            </Paper>
        </Tooltip>
    )
}

export default SingleStatComp