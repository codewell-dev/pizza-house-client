import { getPizzaId } from "@/lib/api";
import { Container, Grid, Typography, Box } from "@mui/material";
import PriceBox from "../entities/productId/price-box";
import ModifiersCheckboxList from "../entities/productId/modifiers-checkbox-list";
import RelatedProducts from "../entities/productId/related-products";
import ModifiersMultiple from "../entities/productId/modifiers-multiple";
import ModifiersList from "../entities/productId/modifiers-list";

interface Params {
    params: { pizzaId: string };
}

export default async function Page({ params }: Params) {
    const pizzaId = params.pizzaId;
    const product = await getPizzaId(pizzaId);

    let productModifiers: any = []; 

    return (
        <Container 
            maxWidth="xl" 
            sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, sm: 3, md: 4 } }} 
        >
            <Grid container spacing={{ xs: 2, md: 4 }} alignItems="flex-start" justifyContent="center">
                
                {/* Картинка */}
                <Grid item xs={12} md={6} className="flex justify-center">
                    <Box 
                        sx={{ 
                            position: 'relative',
                            width: '100%', 
                            maxWidth: '600px',
                            height: { xs: '300px', sm: '350px', md: '500px' }
                        }}
                    >
                        <img
                            src={`https://pizzahouse.ua${product.image.large}`}
                            alt={product.image.title || product.title}
                            className="w-full h-full object-contain mx-auto"
                        />
                    </Box>
                </Grid>

                {/* Контент */}
                <Grid item xs={12} md={6} className="flex flex-col">
                    <Typography 
                        variant="h4" 
                        component="h1"
                        sx={{ fontSize: { xs: '1.75rem', sm: '2.2rem', md: '2.5rem' } }} 
                        gutterBottom
                    >
                        {product.title}
                    </Typography>
                    
                    <Typography 
                        variant="subtitle1" 
                        color="text.secondary"
                        gutterBottom
                    >
                        {product.weight}
                    </Typography>
                    
                    <Typography 
                        variant="body1" 
                        gutterBottom 
                        sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}
                    >
                        {product.description}
                    </Typography>

                    <Box sx={{ my: { xs: 2, md: 4 } }}>
                        <PriceBox product={product} />
                    </Box>
                    
                    {/* Модифікатори */}
                    {product.group_modifiers?.length > 0 && (
                        <Box className="mt-6">
                            <Typography variant="h5" gutterBottom>
                                Хочу додати
                            </Typography>

                            <ModifiersList />

                            {[...product.group_modifiers]
                                .sort((a, b) => {
                                    if (a.type === "select_one" && b.type !== "select_one") return -1;
                                    if (a.type !== "select_one" && b.type === "select_one") return 1;
                                    return 0;
                                })
                                .map((mod: any) =>
                                    mod.type === "select_one" ? (
                                        <ModifiersCheckboxList
                                            key={mod._id} 
                                            title={mod.title}
                                            modifiers={mod.modifiers}
                                            groupId={mod._id}
                                        />
                                    ) :
                                    mod.type === "select_many" ? (
                                        <ModifiersMultiple key={mod._id} e={mod} />
                                    ) : null
                                )}
                        </Box>
                    )}
                </Grid>
            </Grid>

            {/* Супутні продукти */}
            <Box sx={{ mt: { xs: 6, md: 12 } }}>
                <RelatedProducts products={product.well_together_products} />
            </Box>
        </Container>
    );
}