import { makeStyles } from "@material-ui/core";


const nextRankTooltip = makeStyles({
    wood: {
        background: "linear-gradient(250deg, #443022 0%, #2f2117 21%, #443022 40%, #2f2117 100%)",
        fontSize: "12px",
        fontWeight: "bold"
    },
    bronze: {
        background: "linear-gradient(227deg, #A46628 0%, #b68453 21%, #A46628 60%, #b68453 100%)",
        fontSize: "12px",
        fontWeight: "bold"
    },
    silver: {
        background: "linear-gradient(227deg, #3d3f3f 30%, #585b5b)",
        fontSize: "12px",
        fontWeight: "bold"
    },
    gold: {
        background: "linear-gradient(227deg, gold 0%, goldenrod 81%, goldenrod 100%, goldenrod 100%)",
        fontSize: "12px",
        fontWeight: "bold"
    },
    platinum: {
        background: "linear-gradient(227deg, grey 0%, silver 81%, dimgrey 100%, silver 100%)",
        fontSize: "12px",
        fontWeight: "bold"
    },
    damascus: {
        background: "linear-gradient(227deg, #fb3527 0%, #643bc7 81%, #00c1fb 100%, #643bc7 100%)",
        fontSize: "12px",
        fontWeight: "bold"

    },
    obsidian: {
        background: "linear-gradient(230deg, #313131 5%, black 70%, #313131 81%, black 100%)",
        fontSize: "12px",
        fontWeight: "bold"
    }
})

export default nextRankTooltip