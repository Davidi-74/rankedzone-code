import { Button, Container } from "@material-ui/core"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MiniMatchSummary = (props) => {
    const [match, setMatch] = useState(null);
    const [items, setItems] = useState("");


    let formatMilis = parseInt(props.matchData.utcStartSeconds + "000")
    let matchStart = new Date(formatMilis);

    useEffect(() => {
        setMatch(props.matchData)
    }, [])

    useEffect(() => {
        if (match) {
            let items = (
                <div>
                    ID: {match.matchID} <br />
                    Mode: {match.mode} <br />
                    Start: {String(matchStart)} <br />
                    Placement: {match.teamStats.placement} <br />
                    <br />
                    <Link to={`/match/${match.matchID}/${props.uno}`}>
                        <Button>Match Details</Button>
                    </Link>
                </div>
            )

            setItems(items);
        }
    }, [match])

    return (
        <Container>
            {items}
        </Container>
    )
}

export default MiniMatchSummary