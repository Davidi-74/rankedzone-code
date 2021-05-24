import { Container } from "@material-ui/core"
import { useEffect, useState } from "react"
import utils from './utils'

const WeeklyComp = (props) => {
    const [stats, setStats] = useState("");

    const getWeeklyStats = async () => {
        let temp = await utils.getWeeklyStats(decodeURIComponent(props.username), props.platform);
        setStats(temp);
    }

    useEffect(() => {
        getWeeklyStats();
    }, [])

    return (
        <div>
            <h3>Weekly Battle Royale Stats</h3> <br />
            {/* {stats != "" ? JSON.stringify(stats) : ""} */}
        </div>
    )
}

export default WeeklyComp