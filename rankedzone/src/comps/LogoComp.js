import rankedzone from '../icons/RANKEDZONE.png'
import { useMediaQuery, useTheme } from '@material-ui/core';

const LogoComp = (props) => {
    const theme = useTheme();
    const screenSize = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <div>
            {
                screenSize ?
                    <a href="/rankedzonebuild">
                        <img style={{ marginTop: "20px" }} src={rankedzone} width="40%" />
                    </a>
                    :
                    <a href="/rankedzonebuild">
                        <img style={{ marginTop: "20px" }} src={rankedzone} width="90%" />
                    </a>
            }
        </div>
    )
}

export default LogoComp