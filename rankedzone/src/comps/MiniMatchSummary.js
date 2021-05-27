import { Box, Button, ButtonBase, Container, Divider, Grid, Paper, useMediaQuery, useTheme } from "@material-ui/core"
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import placement from '../mui/placementPaper'
import bgImage from '../mui/matchBgImage'


const MiniMatchSummary = (props) => {
    const [match, setMatch] = useState(null);
    const [items, setItems] = useState("");
    const history = useHistory();
    const theme = useTheme();
    const screenSize = useMediaQuery(theme.breakpoints.up('md'));

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
            case "br_bodycount_pwergrb": return "POWER GRAB";
            default: return mode;
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

    const ordinalNumbers = (num) => {
        let numString = String(num);
        let lastNum = numString[numString.length - 1];
        if (lastNum == 1) {
            return num + "st"
        }
        if (lastNum == 2) {
            return num + "nd"
        }
        if (lastNum == 3) {
            return num + "rd"
        }
        return num + "th"
    }

    useEffect(() => {
        if (match) {
            console.log(match);
            let items = (
                <Paper xs={12} style={{ width: "-webkit-fill-available", margin: 0, backgroundColor: "rgba(0,0,0,0.3)", color: "white" }}>
                    <Grid container justify="flex-start" alignItems="center" direction="row"  >
                        <Grid container item xs={1} justify="flex-start"  >
                            <Paper className={placementColor(match.teamStats.placement)} elevation={0}>
                                <h2>{match.teamStats.placement ? ordinalNumbers(match.teamStats.placement) : "N/A"}</h2>
                            </Paper>
                        </Grid>
                        <Grid container item alignItems="center" justify="center" xs={11}>
                            <Grid item xs={12}>
                                {
                                    screenSize ? <h2 style={{ marginBottom: "8px" }}>{modeName(match.mode)}</h2> : <h3 style={{ marginBottom: "8px" }}>{modeName(match.mode)}</h3>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                {formatDate(match.utcStartSeconds)}<br /><br />
                                <Divider style={{ background: "rgba(125,125,125,0.5)", width: "-webkit-fill-available", height: "1.5px" }} flexItem />
                            </Grid>
                            {
                                screenSize ?
                                    <Grid container item xs={12} justify="space-evenly" alignItems="flex-end">
                                        <Grid item xs={2} style={{ paddingTop: "10px" }}>
                                            <b>KILLS</b> <br />
                                            <h2>{match.playerStats.kills}</h2>
                                        </Grid>
                                        <Divider orientation="vertical" style={{ background: "rgba(125,125,125,0.5)", width: "1.5px" }} flexItem />
                                        <Grid item xs={2} >
                                            <b>DEATHS</b> <br />
                                            <h2>
                                                {match.playerStats.deaths}
                                            </h2>
                                        </Grid>
                                        <Divider orientation="vertical" style={{ background: "rgba(125,125,125,0.5)", width: "1.5px", height: "90px" }} flexItem />
                                        <Grid item xs={2} style={{ minWidth: "fit-content" }}>
                                            <b>DAMAGE DONE</b> <br />
                                            <h2>
                                                {match.playerStats.damageDone}
                                            </h2>
                                        </Grid>
                                        <Divider orientation="vertical" style={{ background: "rgba(125,125,125,0.5)", width: "1.5px" }} flexItem />
                                        <Grid item xs={2} style={{ minWidth: "fit-content" }}>
                                            <b>DAMAGE TAKEN</b> <br />
                                            <h2>
                                                {match.playerStats.damageTaken}
                                            </h2>
                                        </Grid>
                                    </Grid>
                                    :
                                    <Grid container item xs={12} justify="space-evenly" alignItems="flex-end" direction="row">
                                        <Grid item xs={5} style={{ paddingTop: "10px" }}>
                                            <b>KILLS</b> <br />
                                            <h2>{match.playerStats.kills}</h2>
                                        </Grid>
                                        <Divider orientation="vertical" style={{ background: "rgba(125,125,125,0.5)", width: "1.5px" }} flexItem />
                                        <Grid item xs={5} >
                                            <b>DEATHS</b> <br />
                                            <h2>
                                                {match.playerStats.deaths}
                                            </h2>
                                        </Grid>
                                        <Divider style={{ background: "rgba(125,125,125,0.5)", width: "-webkit-fill-available", height: "1.5px" }} flexItem /><br />
                                        <Grid item xs={5} style={{ minWidth: "fit-content" }}>
                                            <b>DAMAGE DONE</b> <br />
                                            <h2>
                                                {match.playerStats.damageDone}
                                            </h2>
                                        </Grid>
                                        <Divider orientation="vertical" style={{ background: "rgba(125,125,125,0.5)", width: "1.5px" }} flexItem />
                                        <Grid item xs={5} style={{ minWidth: "fit-content" }}>
                                            <b>DAMAGE TAKEN</b> <br />
                                            <h2>
                                                {match.playerStats.damageTaken}
                                            </h2>
                                        </Grid>
                                    </Grid>
                            }
                        </Grid>
                    </Grid>
                </Paper>
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
            case "br_bodycount_pwergrb": return matchBgImage.verdansk;
            default: return matchBgImage.verdansk;
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