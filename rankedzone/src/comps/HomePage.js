import { Button, MenuItem, Select, TextField, Container, ListItemIcon, InputLabel, FormControl, Grid, ListItem } from '@material-ui/core'
import { useState } from 'react'
import utils from './utils'
import { BattleIcon, PSNIcon, XBLIcon } from '../mui/icons'
import { homepagePlatforms } from '../mui/homepagePlatforms'
import rankedzone from '../icons/RANKEDZONE.png'

const HomePage = (props) => {
    const [username, setUsername] = useState("");
    const [platform, setPlatform] = useState("battle")

    const getProfile = async (e) => {
        e.preventDefault();
        if (username != "") {
            let resp = await utils.searchProfile(username, platform);
            if (resp.errors) {
                if (resp.errors[0].message === "Cannot return null for non-nullable field profileType.username.") {
                    alert("Username Not Found!")
                }
            }
            else {
                props.history.push(`/player/${resp.platform}/${encodeURIComponent(resp.username)}`)
            }
        }
        else {
            alert("Please enter a username!")
        }
    }

    const showSelectedValueIcon = (value) => {
        if (value === "battle") {
            return <ListItemIcon><BattleIcon /></ListItemIcon>
        }
        if (value === "psn") {
            return <ListItemIcon><PSNIcon /></ListItemIcon>
        }
        if (value === "xbl") {
            return <ListItemIcon><XBLIcon /></ListItemIcon>
        }
    }

    const platformsStyle = homepagePlatforms();
    return (
        <Container style={{ height: "100vh" }}>
            <Grid container direction="column" >
                <Grid item xs={12} style={{ marginTop: "5%", marginBottom: "-40px" }}>
                    <img src={rankedzone} height="60px" />
                </Grid><br /><br />
                <form onSubmit={(e) => getProfile(e)}>
                    <Grid container item direction="row" justify="center" alignItems="center">
                        <Grid item xs={10} style={{ margin: 1, padding: 0, flexBasis: "15%" }}>
                            <TextField type="text" label="Username" InputLabelProps={{ shrink: true }} placeholder='e.g "Davidi74#2560"' style={{ width: "225px" }} onChange={e => setUsername(e.target.value)} />
                        </Grid>
                        <Grid item xs={2} style={{ margin: 0, padding: 0, flexBasis: 0, paddingTop: "25px" }}>
                            <Select value={platform} style={{ width: "65px", height: "47.5px", paddingBottom: "20%" }} MenuProps={{
                                classes: { paper: platformsStyle.root },
                                anchorOrigin: { vertical: "bottom", horizontal: "left" },
                                transformOrigin: { vertical: "top", horizontal: "left" },
                                getContentAnchorEl: null,
                            }}
                                renderValue={(value) => <ListItemIcon>{utils.showSelectedValueIcon(value)}</ListItemIcon>}
                                onChange={e => setPlatform(e.target.value)} >
                                <MenuItem value="battle">
                                    <ListItemIcon >
                                        <BattleIcon />
                                    </ListItemIcon>
                                    Battle.net
                                </MenuItem>
                                <MenuItem value="psn">
                                    <ListItemIcon>
                                        <PSNIcon />
                                    </ListItemIcon>
                                    PlayStation
                                </MenuItem>
                                <MenuItem value="xbl">
                                    <ListItemIcon>
                                        <XBLIcon />
                                    </ListItemIcon>
                                    XBOX
                                </MenuItem>
                            </Select><br /><br />
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={getProfile} type="submit" style={{ width: "290px" }}>Search</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Container>
    )
}

export default HomePage