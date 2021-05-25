import { makeStyles } from "@material-ui/core";
import verdansk84 from '../icons/verdansk84.jpg'
import rebirthIsland from '../icons/rebirthisland.jpg'

const bgImage = makeStyles({
    verdansk: {
        backgroundImage: `url(${verdansk84})`,
        backgroundSize: "cover",
        backgroundPositionY: "25%",
        margin: "3px",
        width: "-webkit-fill-available"
    },
    rebirth: {
        backgroundImage: `url(${rebirthIsland})`,
        backgroundSize: "cover",
        backgroundPositionY: "45%",
        margin: "3px",
        width: "-webkit-fill-available"
    }
})

export default bgImage