import { Box, Button, ButtonBase, Container, Divider, Grid, Paper } from "@material-ui/core"
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
            case "br_rebirth_resurgence_trios": return "VERDANSK RESURGENCE TRIOS";
            case "br_rebirth_resurgence_quads": return "VERDANSK RESURGENCE QUADS";
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
                <Grid container justify="flex-start" alignItems="center" direction="row"  >
                    <Grid container item xs={1} justify="flex-start"  >
                        <Paper className={placementColor(match.teamStats.placement)} elevation={0}>
                            <h2>{match.teamStats.placement ? match.teamStats.placement : "N/A"}</h2>
                        </Paper>
                    </Grid>
                    <Grid contaier item xs={11}>
                        <Grid item xs={12}>
                            <h3>{modeName(match.mode)}</h3>
                        </Grid>
                        <Grid item xs={12}>
                            {formatDate(match.utcStartSeconds)}
                        </Grid><br />
                        <Grid container item direction="row" alignItems="center" xs={12}>
                            <Grid container item xs={12} alignItems="flex-end">
                                <Paper style={{ height: "60px", width: "-webkit-fill-available", opacity: "0.7", backgroundColor: "rgba(0,0,0,0.8)", color: "white" }}>
                                    <Grid container item xs={12} justify="space-evenly" alignItems="center">
                                        <Grid item xs={2}>
                                            KILLS <br />
                                            {match.playerStats.kills}
                                        </Grid>
                                        <Divider orientation="vertical" style={{ background: "white" }} flexItem />
                                        <Grid item xs={2}>
                                            DEATHS <br />
                                            {match.playerStats.deaths}
                                        </Grid>
                                        <Divider orientation="vertical" style={{ background: "white", height: "60px" }} flexItem />
                                        <Grid item xs={2}>
                                            DAMAGE DONE <br />
                                            {match.playerStats.damageDone}
                                        </Grid>
                                        <Divider orientation="vertical" style={{ background: "white" }} flexItem />
                                        <Grid item xs={2}>
                                            DAMAGE TAKEN <br />
                                            {match.playerStats.damageTaken}
                                        </Grid>
                                        <Divider orientation="vertical" style={{ background: "white" }} flexItem />
                                        <Grid item xs={2}>
                                            KD <br />
                                            {match.playerStats.kdRatio.toFixed(2)}
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
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
            case "br_rebirth_resurgence_trios": return matchBgImage.verdansk;
            case "br_rebirth_resurgence_quads": return matchBgImage.verdansk;
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