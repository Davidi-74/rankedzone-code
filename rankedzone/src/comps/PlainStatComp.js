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
            case "damageDone": return "Damage Done"
            case "damageTaken": return "Damage Taken"
            case "avgLifetime": return "Avg. Lifetime"
            case "headshots": return "Headshots"
            case "headshotPercentage": return "% Headshots"
        }
    }

    const secondsToDhms = (seconds) => {
        seconds = Number(seconds);
        let d = Math.floor(seconds / (3600 * 24));
        let h = Math.floor(seconds % (3600 * 24) / 3600);
        let m = Math.floor(seconds % 3600 / 60);

        let dDisplay, hDisplay, mDisplay = null;
        dDisplay = d > 0 ? d + "D" : "";
        hDisplay = h > 0 ? dDisplay ? ", " + h + "H" : h + "H" : "";
        mDisplay = m > 0 ? dDisplay || hDisplay ? ", " + m + "M" : m + " Minutes" : "";
        return dDisplay + hDisplay + mDisplay;
    }

    const formatHsPercentage = (hs) => {
        if (hs === 0) {
            return 0 + "%";
        }
        let temp = hs * 100;
        let hsString = String(temp);
        return hsString[0] + hsString[1] + "%";
    }

    const design = plainDesign();
    return (
        <Paper className={design.root} elevation={3}>
            <Box style={{ borderTopLeftRadius: "3px", borderTopRightRadius: "3px" }} fontWeight="bolder">{displayStat(statType)}</Box>
            <Box fontSize="20px" style={{ background: "white", color: "#212121", borderBottomLeftRadius: "3px", borderBottomRightRadius: "3px" }}>
                {statType === "timePlayed" ? secondsToDhms(stat) : statType === "avgLifetime" ? secondsToDhms(stat) : statType === "headshotPercentage" ? formatHsPercentage(stat) : stat.toLocaleString()}
            </Box>
        </Paper>
    )
}

export default PlainStatComp