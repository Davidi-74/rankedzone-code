import { Button, MenuItem, Select, TextField, Container } from '@material-ui/core'
import { useState } from 'react'
import utils from './utils'

const HomePage = (props) => {
    const [username, setUsername] = useState("");
    const [platform, setPlatform] = useState("battle")

    const getProfile = async () => {
        let resp = await utils.searchProfile(username, platform);
        if (resp.errors) {
            if (resp.errors[0].message === "Cannot return null for non-nullable field profileType.username.") {
                alert("Username Not Found!")
            }
        }
        else {
            console.log(resp);
            props.history.push(`/player/${resp.platform}/${encodeURIComponent(resp.username)}`)
        }
    }

    return (
        <Container>
            <h1>Search</h1>
            <TextField type="text" label="Username" placeholder='e.g "Davidi74#2560" ' onChange={e => setUsername(e.target.value)} />&nbsp;
            <Select placeholder="Platform" value={platform} onChange={e => setPlatform(e.target.value)}>
                <MenuItem value="battle">Battle</MenuItem>
                <MenuItem value="xbl">XBOX</MenuItem>
                <MenuItem value="psn">PSN</MenuItem>
            </Select>
            <Button onClick={getProfile}>Search</Button>
        </Container>
    )
}

export default HomePage