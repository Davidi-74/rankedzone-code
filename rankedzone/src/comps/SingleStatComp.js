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
            case "winPercentage": return "Win Percentage"
            case "killsPerGame": return "Kills Per Game"
        }
    }

    const rankingDesign = ranking();
    return (
        <Paper className={rankingDesign[design]}>
            <Box style={{ color: "white", borderTopLeftRadius: "3px", borderTopRightRadius: "3px" }}>{displayStat(statType)}</Box>
            <Box fontSize="30px" style={{ background: "white" }}>
                {stat.toFixed(2)}
            </Box>
            <Box style={{ color: "white", fontSize: "14px", borderBottomRightRadius: "3px", borderBottomLeftRadius: "3px" }}>{design.toUpperCase()}</Box>
        </Paper>
    )
}

export default SingleStatComp