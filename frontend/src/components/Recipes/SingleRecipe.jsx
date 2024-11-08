import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid2,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Box,
  Chip,
} from "@mui/material";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/recipes/${id}`, {
          headers: {
            Accept: "application/json", // Request JSON format
          },
        });
        console.log(response);
        setRecipe(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <Typography variant="h6">Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {recipe.name}
      </Typography>
      <Typography variant="h6" color="textSecondary">
        Category: {recipe.category}
      </Typography>
      <Grid2 container spacing={4}>
        <Grid2 item xs={12} md={6}>
          <Card>
            {recipe.images.length > 0 && (
              <CardMedia
                component="img"
                alt={recipe.name}
                height="300"
                image={recipe.images[0].url} // Adjust based on your image structure
              />
            )}
            <CardContent>
              <Typography variant="h5">Instructions</Typography>
              <Typography variant="body1">{recipe.instructions}</Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Ingredients</Typography>
              <List>
                {recipe.ingredients.map((ingredient, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={ingredient.name}
                      secondary={`Quantity: ${ingredient.quantity} ${
                        ingredient.isOptional ? "(Optional)" : ""
                      }`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
      <Box my={4}>
        <Typography variant="h5">Nutritional Information</Typography>
        <Typography>Calories: {recipe.nutritionalInfo.calories}</Typography>
        <Typography>Protein: {recipe.nutritionalInfo.protein}</Typography>
        <Typography>
          Carbohydrates: {recipe.nutritionalInfo.carbohydrates}
        </Typography>
        <Typography>Fats: {recipe.nutritionalInfo.fats}</Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h6">Tags</Typography>
        {recipe.tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            variant="outlined"
            style={{ marginRight: 4 }}
          />
        ))}
      </Box>
    </Container>
  );
};

export default RecipeDetail;
