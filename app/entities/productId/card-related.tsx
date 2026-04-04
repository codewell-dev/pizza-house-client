import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { yellow } from "@mui/material/colors";
import Link from "next/link";
import Image from "next/image";
import { RelatedProduct } from "@/types/product";

interface Props {
  product: RelatedProduct;
}

export default function CardRelated({ product }: Props) {
  if (!product) return null;

  return (
    <Card sx={{ display: "flex", justifyContent: "center", alignItems: "center", px: 2, borderRadius: 5, maxWidth: "450px" }}>
      <Link href={`/${product.id ?? product._id}`}>
        <Box sx={{ position: "relative", width: 100, height: 100 }}>
          <Image
            src={`https://pizzahouse.ua${product.image.small}`}
            alt={product.title}
            fill
            sizes="100px"
            style={{ objectFit: "contain" }}
          />
        </Box>
      </Link>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ my: "auto" }}>
          <Typography component="div" variant="h6">{product.title}</Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, gap: 3 }}>
            <Typography component="div" variant="h6">{product.price} ₴</Typography>
            <IconButton
              aria-label="Додати до кошика"
              size="small"
              sx={{ width: 30, height: 30, backgroundColor: yellow[500], color: "white", ":hover": { backgroundColor: yellow[700] } }}
            >
              <AddIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
