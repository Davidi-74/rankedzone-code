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
    const [alert, setAlert] = useState(<span><br /></span>);

    const getProfile = async (e) => {
        e.preventDefault();
        if (username != "") {
            setAlert(<span><LinearProgress style={{ width: "275px", marginBottom: "21px" }} color="secondary" /></span>)
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
            <Grid container direction="column">
                <Grid item xs={12} style={{ marginTop: "8vh", marginBottom: "-1%" }}>
                    <LogoComp />
                </Grid><br /><br />
                <form onSubmit={(e) => getProfile(e)}>
                    <Grid container item xs={12} direction="column" justify="center" alignItems="center" >
                        <Grid container item xs={12} direction="row" justify="center" alignItems="center">
                            <Grid item xs={6} md={3} >
                                <TextField type="text" label="Username" fullWidth InputLabelProps={{ shrink: true }} placeholder='e.g. "Davidi74#2560"' onChange={e => setUsername(e.target.value)} />
                            </Grid>
                            <Grid item xs={12} sm={1} style={{ flexBasis: 0, paddingTop: "25px", maxWidth: "100%" }}>
                                <Select value={platform} style={{ height: "47.5px", paddingBottom: "20%", borderLeft: "solid", borderLeftColor: "rgba(125,125,125,0.2)", borderTopLeftRadius: 0 }} MenuProps={{
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
                        </Grid>
                        <Grid container item justify="center" xs={12} style={{ height: "20px" }}>
                            {
                                alert !== "" ?
                                    alert
                                    :
                                    null
                            }
                        </Grid>
                        <Grid item xs={10} md={4} style={{ width: "100%" }}>
                            <Button onClick={getProfile} fullWidth type="submit" >Search</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
        </Container>
    )
}

export default HomePage