import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Use for navigation

const ProductCard = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.id}`); // Navigate to the product detail page
  };

  return (
    <Card
      onClick={handleClick} // Navigate on card click
      sx={{
        maxWidth: 345,
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": { boxShadow: 6, cursor: "pointer" }, // Change cursor on hover
      }}
    >
      <Typography height={200}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: "contain" }}
          overflow="hidden"
        />
      </Typography>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" noWrap>
          {product.title}
        </Typography>
        <Typography color="textSecondary" sx={{ mb: 1.5 }}>
          ${product.price}
        </Typography>
        <Typography variant="body2" color="textSecondary" noWrap>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="error"
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation when delete is clicked
            onDelete(product.id);
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
