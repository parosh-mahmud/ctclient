import React from "react";
import {
  Box,
  Typography,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const FlightInfoItem = React.memo(
  ({ icon, value, valueStyle, isMobile, isLoading }) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("xs"));
    const isSm = useMediaQuery(theme.breakpoints.between("xs", "sm"));
    const isMd = useMediaQuery(theme.breakpoints.between("sm", "md"));

    let variant;
    if (isXs) {
      variant = "body2";
    } else if (isSm) {
      variant = "body1";
    } else if (isMd) {
      variant = "h6";
    } else {
      variant = "h5";
    }

    return (
      <Box flex="1" display="flex" alignItems="center">
        {icon && <Box sx={{ mr: 1 }}>{icon}</Box>}
        {isLoading ? (
          <Skeleton width={60} height={20} />
        ) : (
          <Typography variant={variant} style={{ ...valueStyle, flexGrow: 1 }}>
            {value}
          </Typography>
        )}
      </Box>
    );
  }
);

export default FlightInfoItem;
