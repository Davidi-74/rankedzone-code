import { Box, Button, ButtonBase, Container, Grid, Paper } from "@material-ui/core"
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import placement from '../mui/placementPaper'
import bgImage from '../mui/matchBgImage'


const MiniMatchSummary = (props) => {
    const [match, setMatch] = useState(null);
    const [items, setItems] = useState("");
    const history = useHistory();

    useEffect(() => {
        setMatch(props.matchData)
    }, [])

    const modeName = (mode) => {
        switch (mode) {
            case "br_brsolo": return "BR SOLOS";
            case "br_brduos": return "BR DOUS";
            case "br_brtrios": return "BR TRIOS";
            case "br_brquads": return "BR QUADS";
            case "br_rebirth_rbrthduos": return "REBIRTH RESURGENCE DOUS";
            case "br_rebirth_rbrthtrios": return "REBIRTH RESURGENCE TRIOS";
            case "br_rebirth_rbrthquad": return "REBIRTH RESURGENCE TRIOS";
            case "br_rebirth_resurgence_dous": return "VERDANSK RESURGENCE DOUS";
            case "br_rebirth_resurgence_dous": return "VERDANSK RESURGENCE TRIOS";
            case "br_rebirth_resurgence_dous": return "VERDANSK RESURGENCE QUADS";
        }
    }

    const formatDate = (milis) => {
        let formatMilis = parseInt(milis + "000")
        let matchStart = new Date(formatMilis);
        let time = matchStart.toTimeString().substring(0, 5);
        let date = matchStart.toDateString();
        return String(date.substring(0, 3) + ", " + date.substring(4, 10) + " | " + time);
    }

    const placementStyle = placement();
    const placementColor = (placement) => {
        if (placement === 1) {
            return placementStyle.first;
        }
        if (placement === 2) {
            return placementStyle.second;
        }
        if (placement === 3) {
            return placementStyle.third;
        }
        return placementStyle.other
    }

    useEffect(() => {
        if (match) {
            console.log(match);
            let items = (
                <Grid container justify="flex-start" alignItems="flex-start" direction="column" style={{ paddingLeft: "5px" }} >
                    <Grid item xs={12}>
                        {formatDate(match.utcStartSeconds)}
                    </Grid>
                    <Grid item xs={12}>
                        {modeName(match.mode)}
                    </Grid>
                    <Grid container item direction="row" xs={12}>
                        <Grid item xs={3}>
                            <Paper className={placementColor(match.teamStats.placement)} elevation={3}>
                                <Box fontWeight="bold">
                                    <h2>{match.teamStats.placement ? match.teamStats.placement : "N/A"}</h2>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            KILLS <br />
                            {match.playerStats.kills}
                        </Grid>
                        <Grid item xs={3}>
                            DAMAGE <br />
                            {match.playerStats.damageDone}
                        </Grid>
                    </Grid>
                </Grid>
            )

            setItems(items);
        }
    }, [match])

    const matchRef = () => {
        if (match) {
            history.push(`/match/${match.matchID}/${props.uno}`);
        }
    }


    const matchBgImage = bgImage();
    const pickBgImage = (mode) => {
        switch (mode) {
            case "br_brsolo": return matchBgImage.verdansk;
            case "br_brduos": return matchBgImage.verdansk;
            case "br_brtrios": return matchBgImage.verdansk;
            case "br_brquads": return matchBgImage.verdansk;
            case "br_rebirth_rbrthduos": return matchBgImage.rebirth;
            case "br_rebirth_rbrthtrios": return matchBgImage.rebirth;
            case "br_rebirth_rbrthquad": return matchBgImage.rebirth;
            case "br_rebirth_resurgence_dous": return matchBgImage.verdansk;
            case "br_rebirth_resurgence_dous": return matchBgImage.verdansk;
            case "br_rebirth_resurgence_dous": return matchBgImage.verdansk;
        }
    }

    return (
        <div>
            {
                match != null ?
                    <ButtonBase style={{ width: "-webkit-fill-available" }}>
                        <Paper onClick={matchRef} className={pickBgImage(match.mode)}>
                            {items}
                        </Paper>
                    </ButtonBase>
                    :
                    ""
            }
        </div>
    )
}

export default MiniMatchSummary