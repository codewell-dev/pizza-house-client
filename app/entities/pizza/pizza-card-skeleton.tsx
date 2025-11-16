import { Card, Skeleton, Box } from "@mui/material";

export default function PizzaCardSkeleton() {
  return (
    <Card sx={{ p: 2, height: "100%" }}>
      <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
      <Skeleton height={30} width="70%" sx={{ mt: 2 }} />
      <Skeleton height={20} width="90%" />
      <Skeleton height={20} width="50%" />
      <Box sx={{ mt: "auto", pt: 2 }}>
        <Skeleton height={40} width="100%" />
      </Box>
    </Card>
  );
}
