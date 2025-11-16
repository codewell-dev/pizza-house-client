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

export default function ModalPopup() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button
        color="inherit"
        sx={{
          fontWeight: 400,
          textTransform: "none",
          fontSize: 16,
          "&:hover": { color: theme.palette.secondary.main },
        }}
        onClick={handleClickOpen}
      >
        УВІЙТИ
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
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
        {/* Заголовок */}
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pb: 0,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Увійти
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        {/* Контент */}
        <DialogContent>
          <Typography variant="body2" mb={2} color="text.secondary">
            Будь ласка, введіть свій номер телефону та пароль
          </Typography>

          <Box mt={1}>
            <LoginForm />
          </Box>
        </DialogContent>

        {/* Дії */}
        <DialogActions sx={{ justifyContent: "flex-end", p: 2, pt: 0 }}>
          <Button onClick={handleClose} color="inherit">
            Закрити
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Увійти
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
