import { Paper, Box } from "@material-ui/core"
import { useEffect, useState } from "react"
import utils from './utils'
import ranking from '../mui/rankingDesign'

const SingleStatComp = (props) => {
    const [statType, setStatType] = useState(props.statType);
    const [stat, setStat] = useState(props.stat);
    const [design, setDesign] = useState("");

    useEffect(() => {
        let design = utils.getRankingDesign(statType, stat);
        console.log(design);
        setDesign(design);
    }, [])

    const displayStat = (stat) => {
        switch (stat) {
            case "kd": return "K/D Ratio"
            case "kills": return "Kills"
            case "wins": return "Wins"
            case "winPercentage": return "% Wins"
            case "killsPerGame": return "Kills / Game"
        }
    }

    const rankingDesign = ranking();
    return (
        <Paper className={rankingDesign[design]}>
            <Box style={{ color: "white", borderTopLeftRadius: "3px", borderTopRightRadius: "3px" }} fontWeight="bolder">{displayStat(statType)}</Box>
            <Box fontSize="30px" style={{ background: "white" }}>
                {statType === "kd" || statType === "killsPerGame" || statType === "winPercentage" ? stat.toFixed(2) : stat.toLocaleString()}
            </Box>
            <Box style={{ color: "white", fontSize: "14px", borderBottomRightRadius: "3px", borderBottomLeftRadius: "3px" }} fontWeight="bolder">{design == "default" ? "" : design.toUpperCase()}</Box>
        </Paper>
    )
}

export default SingleStatComp