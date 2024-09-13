import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Grid,
  Container,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Pagination,
} from "@mui/material";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} from "../../Service/productApi";
import ProductCard from "../ProductCard";
import SkeletonProductCard from "../SkeletonProductCard";

const ProductManager = () => {
  const { data: categories = [] } = useGetCategoriesQuery();
  const [addProduct, { isLoading }] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [selectedCategory, setSelectedCategory] = useState("");

  const offset = (page - 1) * limit;

  const isCategorySelected = selectedCategory !== "";

  const {
    data: allProducts = [],
    isLoading: isAllProductsLoading,
    refetch: refetchAllProducts,
  } = useGetProductsQuery({ limit, offset });

  const {
    data: categoryProducts = [],
    isLoading: isCategoryProductsLoading,
    refetch: refetchCategoryProducts,
  } = useGetProductsByCategoryQuery(
    { category: selectedCategory, limit, offset },
    { skip: !isCategorySelected }
  );

  const products = isCategorySelected ? categoryProducts : allProducts;
  const isProductsLoading = isCategorySelected
    ? isCategoryProductsLoading
    : isAllProductsLoading;
  const refetch = isCategorySelected
    ? refetchCategoryProducts
    : refetchAllProducts;

  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: () => {
      return categories.map((category) => (
        <MenuItem key={category} value={category}>
          {category}
        </MenuItem>
      ));
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddProduct = async () => {
    if (
      !newProduct.title ||
      !newProduct.price ||
      !newProduct.description ||
      !newProduct.image ||
      !newProduct.category
    ) {
      setOpen(false);
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "All fields are required. Please fill in all fields.",
      });
      return;
    }

    try {
      await addProduct(newProduct).unwrap();
      Swal.fire({
        icon: "success",
        title: "Product Added!",
        text: "Your product has been added successfully.",
      });
      setNewProduct({
        title: "",
        price: "",
        description: "",
        image: "",
        category: "electronics",
      });
      handleClose();
      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while adding the product.",
      });
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setPage(1);
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    refetch();
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    refetch();
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(1);
    refetch();
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <Typography variant="h4" gutterBottom>
          Product Management
        </Typography>
        <Button variant="contained" onClick={handleClickOpen}>
          Add Product
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Product Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Product Price"
            type="number"
            fullWidth
            variant="outlined"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Product Description"
            type="text"
            fullWidth
            variant="outlined"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Product Image URL"
            type="text"
            fullWidth
            variant="outlined"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Product Category"
            type="text"
            fullWidth
            variant="outlined"
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleAddProduct} disabled={isLoading}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Category Dropdown */}
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select value={selectedCategory} onChange={handleCategoryChange}>
          <MenuItem value="">
            <em>All Categories</em>
          </MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Limit Dropdown */}
      <FormControl fullWidth sx={{ my: 2 }}>
        <InputLabel>Items Per Page</InputLabel>
        <Select value={limit} onChange={handleLimitChange}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>

      {/* Display Products */}
      <Grid container spacing={3}>
        {isProductsLoading
          ? [...Array(limit)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <SkeletonProductCard />
              </Grid>
            ))
          : products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} onDelete={handleDeleteProduct} />
              </Grid>
            ))}
      </Grid>

      {/* Pagination Controls */}
      <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
        <Pagination
          count={Math.ceil(20 / limit)}
          page={page}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
      </Box>
    </Container>
  );
};

export default ProductManager;
