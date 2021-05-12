import { Button, MenuItem, Select, TextField, Container, ListItemIcon, InputLabel, FormControl } from '@material-ui/core'
import { useState } from 'react'
import utils from './utils'
import { BattleIcon, PSNIcon, XBLIcon } from '../mui/icons'

const HomePage = (props) => {
    const [username, setUsername] = useState("");
    const [platform, setPlatform] = useState("battle")
    const [flag, setFlag] = useState(false)

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

    return (
        <Container>
            <h1>SEARCH PROFILE</h1>
            <form onSubmit={(e) => getProfile(e)}>
                <TextField type="text" label="Username" InputLabelProps={{ shrink: true }} placeholder='e.g "Davidi74#2560"' inputLa onChange={e => setUsername(e.target.value)} />&nbsp;
                <Select value={platform} style={{ width: "70px", height: "50px" }} renderValue={(value) => showSelectedValueIcon(value)} onChange={e => setPlatform(e.target.value)} >
                    <MenuItem value="battle">
                        <ListItemIcon>
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
                </Select>&nbsp;
                <Button onClick={getProfile} type="submit">Search</Button>
            </form>
        </Container>
    )
}

export default HomePage