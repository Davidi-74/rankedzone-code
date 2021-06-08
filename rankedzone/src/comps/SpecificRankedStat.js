import { useEffect, useState } from "react"
import utils from './utils'
import ranking from '../mui/rankingDesign'
import { Box, Paper } from "@material-ui/core";

const SpecificRankedStat = (props) => {
    const [statType, setStat] = useState(props.statType);
    const [rankingData, setRankingData] = useState([]);

    const getStats = () => {
        let currentRank = 0;
        let rankingData = [];
        for (let i = 0; i < 7; i++) {
            let statData = utils.getRankingDesign(statType, currentRank);
            if (statData.design != "obsidian") {
                let obj = [statData.design, currentRank, statData.nextLevel[1]]
                rankingData.push(obj);
                currentRank = statData.nextLevel[1];
            }
            else {
                let obj = [statData.design, currentRank];
                rankingData.push(obj);
            }
        }
        console.log(rankingData);
        setRankingData(rankingData.reverse());
    }

    useEffect(() => {
        getStats();
    }, [])

    const rankingDesign = ranking();
    return (
        <div>
            {
                rankingData.length > 0 ?
                    (
                        rankingData.map((rank) => {
                            return (
                                <Paper elevation={3} style={{ width: "100%", marginBottom: "8px" }}>
                                    <Box className={rankingDesign[rank[0]]} color="white" fontWeight="bold" style={{ borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}>
                                        {rank[0].toUpperCase()}
                                    </Box>
                                    {rank[0] !== "obsidian" ? rank[1].toLocaleString(2) + "-" + rank[2].toLocaleString(2) : rank[1].toLocaleString(2) + "+"}
                                </Paper>
                            )
                        })
                    )
                    :
                    ""
            }
        </div>
    )
}

export default SpecificRankedStat