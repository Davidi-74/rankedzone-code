import { Container } from "@material-ui/core"
import { useEffect, useState } from "react"
import utils from './utils'

const LifetimeComp = (props) => {
    const [stats, setStats] = useState("");

    const getLifetimeStats = async () => {
        let temp = await utils.getLifetimeStats(decodeURIComponent(props.username), props.platform);
        setStats(temp);
    }

    useEffect(() => {
        getLifetimeStats();
    }, [])

    return (
        <Container>
            lifetime <br />
            {stats != "" ? JSON.stringify(stats) : ""}
        </Container>
    )
}

export default LifetimeComp