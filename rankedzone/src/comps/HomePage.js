import { Button, MenuItem, Select, TextField, Container, ListItemIcon, Grid, ButtonBase } from '@material-ui/core'
import { useState } from 'react'
import utils from './utils'
import { BattleIcon, PSNIcon, XBLIcon } from '../mui/icons'
import { homepagePlatforms } from '../mui/homepagePlatforms'
import LogoComp from './LogoComp'
import LinearProgress from '@material-ui/core/LinearProgress';
import GitHubIcon from '@material-ui/icons/GitHub';

const HomePage = (props) => {
    const [username, setUsername] = useState("");
    const [platform, setPlatform] = useState("battle")
    const [alert, setAlert] = useState("");

    const getProfile = async (e) => {
        e.preventDefault();
        if (username != "") {
            setAlert(<span><LinearProgress style={{ width: "275px" }} color="secondary" /></span>)
            let resp = await utils.searchProfile(username, platform);
            if (resp.errors) {
                if (resp.errors[0].message === "Cannot return null for non-nullable field profileType.username.") {
                    setAlert(<p style={{ marginTop: "-10px", fontSize: 16 }}>Username Not Found!</p>)
                }
            }
            else {
                props.history.push(`/player/${resp.platform}/${encodeURIComponent(resp.username)}`)
            }
        }
        else {
            setAlert(<p style={{ marginTop: "-10px", fontSize: 16 }}>Please enter a username!</p>)
        }
    }

    const platformsStyle = homepagePlatforms();
    return (
        <Container style={{ height: "100vh" }}>
            <Grid container direction="column" >
                <Grid item xs={12} style={{ marginTop: "130px", marginBottom: "-1%" }}>
                    <LogoComp />
                </Grid><br /><br />
                <form onSubmit={(e) => getProfile(e)}>
                    <Grid container item direction="row" justify="center" alignItems="center">
                        <Grid item xs={10} style={{ margin: 1, padding: 0, flexBasis: "15%" }}>
                            <TextField type="text" label="Username" InputLabelProps={{ shrink: true }} placeholder='e.g. "Davidi74#2560"' style={{ width: "100%" }} onChange={e => setUsername(e.target.value)} />
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
                        <Grid container item justify="center" xs={12} style={{ height: "20px" }}>
                            {
                                alert != "" ?
                                    alert
                                    :
                                    null
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={getProfile} type="submit" style={{ width: "290px" }}>Search</Button>
                        </Grid>

                    </Grid>
                </form>
            </Grid>
            <footer>
                <br /><br /><div>
                    RANKEDZONE is a mobile-friendly web application used for ranking and tracking Call of Duty: Warzone statistics,
                    integrating with COD's official API. <br /><br />
                    RANKEDZONE was created by Davidi Shohat <br /> <br />
                    <ButtonBase href="https://github.com/Davidi-74">
                        <GitHubIcon />
                    </ButtonBase>
                </div>
            </footer>
        </Container>
    )
}

export default HomePage