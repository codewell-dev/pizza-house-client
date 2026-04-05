"use client";

import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginForm from "../entities/modal/login-form";
import { useTranslations } from "next-intl";

export default function ModalPopup() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const t = useTranslations("login");

  return (
    <>
      <Button
        color="inherit"
        sx={{ fontWeight: 400, textTransform: "none", fontSize: 14 }}
        onClick={() => setOpen(true)}
      >
        {t("openBtn")}
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullScreen={fullScreen}
        PaperProps={{
          sx: {
            borderRadius: fullScreen ? 0 : 3,
            p: 1,
            width: "100%",
            maxWidth: 500,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pb: 0,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            {t("title")}
          </Typography>
          <IconButton onClick={() => setOpen(false)} aria-label={t("close")}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Typography variant="body2" mb={2} color="text.secondary">
            {t("subtitle")}
          </Typography>
          <Box mt={1}>
            <LoginForm />
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "flex-end", p: 2, pt: 0 }}>
          <Button onClick={() => setOpen(false)} color="inherit">
            {t("close")}
          </Button>
          <Button color="primary" variant="contained" type="submit">
            {t("submit")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
