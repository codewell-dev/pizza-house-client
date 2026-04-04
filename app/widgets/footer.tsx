"use client";

import React from "react";
import {
  Box, Container, Typography, Stack, IconButton, Divider, useTheme, useMediaQuery,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  "Головна", "Ресторани", "Відгуки", "Акції", "Новини",
  "Бонусна програма", "Умови доставки", "Бенкети",
  "Про компанію Pizza House", "Вакансії",
  "Зв'язок з Керівництвом", "Оферта", "Умови компанії",
];

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box component="footer" bgcolor={grey[100]} py={5} mt={6}>
      <Container maxWidth="xl">
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={4}
          justifyContent="space-between"
          alignItems={isMobile ? "center" : "flex-start"}
        >
          <Stack spacing={1}>
            {NAV_LINKS.map((title) => (
              <Typography
                key={title}
                component={Link}
                href="/"
                sx={{
                  color: grey[800],
                  textDecoration: "none",
                  fontSize: 15,
                  "&:hover": { color: theme.palette.primary.main },
                }}
              >
                {title}
              </Typography>
            ))}
          </Stack>

          <Stack spacing={2} alignItems={isMobile ? "center" : "flex-end"}>
            <Box>
              <Image
                src="https://pizzahouse.ua/_next/static/media/google_play.6ba3105b.svg"
                alt="Google Play"
                width={140}
                height={42}
                style={{ marginBottom: 8, display: "block" }}
              />
              <Image
                src="https://pizzahouse.ua/_next/static/media/app_store.79c3e27c.svg"
                alt="App Store"
                width={140}
                height={42}
                style={{ display: "block" }}
              />
            </Box>

            <Stack direction="row" spacing={1.5}>
              <IconButton color="inherit" aria-label="Instagram"><InstagramIcon sx={{ fontSize: 32 }} /></IconButton>
              <IconButton color="inherit" aria-label="Facebook"><FacebookIcon sx={{ fontSize: 32 }} /></IconButton>
              <IconButton color="inherit" aria-label="Telegram"><TelegramIcon sx={{ fontSize: 32 }} /></IconButton>
            </Stack>
          </Stack>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" color={grey[600]} textAlign="center" fontSize={13}>
          © 2008–2025 Pizza House. Усі права захищені.
        </Typography>
      </Container>
    </Box>
  );
}
