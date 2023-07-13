import { Box } from "@mui/material";
import { styled } from "@emotion/styled";

/**
 * This is a style-component. MaterialUI has Box component that allows us to pass in anytype of css
 * property and use them as component property 
 */
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alighItems: "center"
})

export default FlexBetween;