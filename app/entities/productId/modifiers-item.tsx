import { Box, IconButton, Typography } from "@mui/material";
import { yellow } from "@mui/material/colors";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";
import { Modifier } from "./modifiers-checkbox-list";
import { useShopStore } from "@/app/providers/store-provider";

export default function ModifiersItem({ modifier }: { modifier: Modifier }) {
    const removeModifier = useShopStore((state) => state.removeModifier);
    return (
        <Box sx={{
            display: "flex", alignItems: "center",
            gap: 1, border: "1px solid #e0e0e0",
            borderRadius: 6, px: 2, py: 1,
            width: "fit-content", cursor: "pointer", ":hover": { borderColor: yellow[500] }
        }}>
            <Typography variant="subtitle2">{modifier.title} x{modifier.count}</Typography>
            <IconButton
                aria-label="delete"
                size="small"
                sx={{
                    backgroundColor: yellow[500],
                    color: "white",
                    ":hover": "none",
                    width: 17, height: 17
                }}
                onClick={() => removeModifier(modifier._id)}
            >
                <RemoveIcon fontSize="inherit" />
            </IconButton>
        </Box>
    )
}