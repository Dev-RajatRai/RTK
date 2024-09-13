import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../Service/productApi";
import {
  Grid,
  Typography,
  Box,
  Button,
  Container,
  CircularProgress,
  Skeleton,
} from "@mui/material";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL params
  const { data: product, isLoading } = useGetProductByIdQuery(id); // Fetch product details based on ID

  if (isLoading) {
    // Show skeleton while loading
    return (
      <Container sx={{ my: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" width="100%" height={400} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="text" width="50%" height={30} sx={{ mb: 2 }} />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={120}
              sx={{ mb: 4 }}
            />
            <Skeleton variant="rectangular" width="50%" height={50} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Typography variant="h5" color="error" align="center">
          Product not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ my: 4 }}>
      <Grid container spacing={4}>
        {" "}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                maxWidth: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
              ${product.price}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              {product.description}
            </Typography>
            <Button variant="contained" color="primary" size="large">
              Add to Cart
            </Button>
          </Box>
        </Grid>
        {/* Right Side: Product Image */}
      </Grid>
    </Container>
  );
};

export default ProductDetail;
