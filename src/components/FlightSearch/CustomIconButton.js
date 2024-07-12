import { Box, Typography } from "@mui/material";

export function CustomIconButton({
  value,
  selectedValue,
  onChange,
  Icon,
  label,
  rotate,
}) {
  const isSelected = selectedValue === value;
  const iconStyle = rotate ? { transform: "rotate(270deg)" } : {};

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginRight: "16px",
        marginBottom: "10px",
        marginTop: "10px",
        justifyContent: "center",
        backgroundColor: isSelected ? "#0067FF" : "transparent",
        color: isSelected ? "#fff" : "inherit",
        padding: "6px 12px",
        borderRadius: "5px",
        border: isSelected ? "1px solid #0067FF" : "1px solid transparent",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: isSelected ? "#0056cc" : "#f0f0f0",
          borderColor: isSelected ? "#0056cc" : "#ccc",
        },
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
      onClick={() => onChange(value)}
    >
      <Icon color={isSelected ? "inherit" : "action"} style={iconStyle} />
      <Typography
        variant="caption"
        sx={{
          marginLeft: "8px",
          color: "inherit",
          fontSize: {
            xs: "10px",
            sm: "14px",
          },
          fontFamily: "Google Sans",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
