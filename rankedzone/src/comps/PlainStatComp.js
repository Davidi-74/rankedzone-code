import { Paper, Box } from "@material-ui/core"
import plainDesign from '../mui/plainStatDesign'
import { useState } from "react"

const PlainStatComp = (props) => {
    const [statType, setStatType] = useState(props.statType);
    const [stat, setStat] = useState(props.stat);

    const displayStat = (stat) => {
        switch (stat) {
            case "matches": return "Matches"
            case "deaths": return "Deaths"
            case "topFive": return "Top 5"
            case "topTen": return "Top 10"
            case "downs": return "Downs"
            case "revives": return "Revives"
            case "contracts": return "Contracts"
            case "score": return "Score"
            case "timePlayed": return "Time Played"
        }
    }

    const secondsToDhms = (seconds) => {
        seconds = Number(seconds);
        let d = Math.floor(seconds / (3600 * 24));
        let h = Math.floor(seconds % (3600 * 24) / 3600);
        let m = Math.floor(seconds % 3600 / 60);

        let dDisplay = d > 0 ? d + "D, " : "";
        let hDisplay = h > 0 ? h + "H, " : "";
        let mDisplay = m > 0 ? m + "M" : "";
        return dDisplay + hDisplay + mDisplay;
    }

    const design = plainDesign();
    return (
        <Paper className={design.root} >
            <Box style={{ borderTopLeftRadius: "3px", borderTopRightRadius: "3px" }} fontWeight="bolder">{displayStat(statType)}</Box>
            <Box fontSize="20px" style={{ background: "white", color: "#212121", borderBottomLeftRadius: "3px", borderBottomRightRadius: "3px" }}>
                {statType == "timePlayed" ? secondsToDhms(stat) : stat.toLocaleString()}
            </Box>
        </Paper>
    )
}

export default PlainStatComp