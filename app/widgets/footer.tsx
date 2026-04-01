"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import { grey } from "@mui/material/colors";
import Link from "next/link";

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const links = [
    "Головна",
    "Ресторани",
    "Відгуки",
    "Акції",
    "Новини",
    "Бонусна програма",
    "Умови доставки",
    "Бенкети",
    "Про компанію Pizza House",
    "Вакансії",
    "Зв'язок з Керівництвом",
    "Оферта",
    "Умови компанії",
  ];

  return (
    <Box bgcolor={grey[100]} py={5} mt={6}>
      <Container maxWidth="xl">
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={4}
          justifyContent="space-between"
          alignItems={isMobile ? "center" : "flex-start"}
        >
          {/* Колонка з посиланнями */}
          <Stack spacing={1}>
            {links.map((title, idx) => (
              <Typography
                key={idx}
                component={Link}
                href="/"
                sx={{
                  color: grey[800],
                  textDecoration: "none",
                  fontSize: 15,
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {title}
              </Typography>
            ))}
          </Stack>

          {/* Блок із магазинами та соцмережами */}
          <Stack spacing={2} alignItems={isMobile ? "center" : "flex-end"}>
            <Box>
              <img
                src="https://pizzahouse.ua/_next/static/media/google_play.6ba3105b.svg"
                alt="Google Play"
                style={{ width: 140, marginBottom: 8 }}
              />
              <img
                src="https://pizzahouse.ua/_next/static/media/app_store.79c3e27c.svg"
                alt="App Store"
                style={{ width: 140 }}
              />
            </Box>

            <Stack direction="row" spacing={1.5}>
              <IconButton color="inherit">
                <InstagramIcon sx={{ fontSize: 32 }} />
              </IconButton>
              <IconButton color="inherit">
                <FacebookIcon sx={{ fontSize: 32 }} />
              </IconButton>
              <IconButton color="inherit">
                <TelegramIcon sx={{ fontSize: 32 }} />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="body2"
          color={grey[600]}
          textAlign="center"
          fontSize={13}
        >
          © 2008–2025 Pizza House. Усі права захищені.
        </Typography>
      </Container>
    </Box>
  );
}
