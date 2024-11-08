import { useState } from "react";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Grid2,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";
import toast from "react-hot-toast";
import api from "../../config/Axios.config";
import { API } from "../../config/utils";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddRecipe = () => {
  const [ingredients, setIngredients] = useState([
    { name: "", quantity: "" },
    { name: "", quantity: "" },
    { name: "", quantity: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    instructions: "",
    difficulty: "",
    prepTime: "",
    cookTime: "",
    servings: 0,
    tags: "", // Keep it as a string for input
    calories: "",
    protein: "",
    carbohydrates: "",
    fat: "",
  });
  const navigate = useNavigate();

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleFileUpload = (e) => {
    setUploads((prev) => [...prev, ...e.target.files]);
    Array.from(e.target.files).forEach((file) => {
      let newFile;
      if (file.type.includes("video")) {
        const filePreview = URL.createObjectURL(file);
        newFile = { type: "video", name: file.name, file: filePreview };
      } else {
        const filePreview = URL.createObjectURL(file);
        newFile = { type: "image", name: file.name, file: filePreview };
      }

      setUploadedMedia((prev) => {
        return [...prev, newFile];
      });
    });
    e.target.value = null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle servings as a number
    const newValue = name === "servings" ? Number(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const removeIngredient = (index) => {
    // Prevent removing the first ingredient row
    if (index > 0) {
      const newIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(newIngredients);
    }
  };

  const submitData = (e) => {
    e.preventDefault();

    // Split tags into an array by commas and trim whitespace
    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    // const recipeData = {
    //   ...formData,
    //   ingredients,
    //   uploads,
    //   tags: tagsArray, // Save tags as an array
    // };
    const formDataToSend = new FormData();

    // Append all fields to FormData
    formDataToSend.append("name", formData.name);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("instructions", formData.instructions);
    formDataToSend.append("difficulty", formData.difficulty);
    formDataToSend.append("prepTime", formData.prepTime);
    formDataToSend.append("cookingTime", formData.cookingTime);
    formDataToSend.append("servings", formData.servings);
    formDataToSend.append("calories", formData.calories);
    formDataToSend.append("protein", formData.protein);
    formDataToSend.append("carbohydrates", formData.carbohydrates);
    formDataToSend.append("fat", formData.fat);
    formDataToSend.append("tags", JSON.stringify(tagsArray)); // If you want to send tags as a JSON string

    // Append ingredients
    ingredients.forEach((ingredient, index) => {
      formDataToSend.append(`ingredients[${index}][name]`, ingredient.name);
      formDataToSend.append(
        `ingredients[${index}][quantity]`,
        ingredient.quantity
      );
    });

    // Append uploads if any (assuming uploads is an array of files)
    if (uploads && uploads.length > 0) {
      uploads.forEach((file) => {
        formDataToSend.append(`uploads`, file);
      });
    }

    toast
      .promise(api.post(API.createRecipe, formDataToSend), {
        loading: "Creating Recipe...",
        success: (data) => {
          if (data?.data?.success) {
            navigate("/recipes");
            return data?.data?.message || "Success";
          } else {
            return data?.data.message || "Server Error. Please try again";
          }
        },
        error: (err) => {
          console.log(err);
          return (
            err?.response?.data?.message || "Server Error. Please try again"
          );
        },
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Grid2>
      <form onSubmit={submitData}>
        <Stack sx={{ backgroundColor: "#fff", padding: 2 }} gap={1}>
          <TextField
            required
            label={"Recipe Name"}
            variant="filled"
            name="name"
            placeholder="Enter your Recipe name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label={"Category"}
            variant="filled"
            name="category"
            placeholder="Enter your Recipe category"
            fullWidth
            value={formData.category}
            onChange={handleChange}
          />
          {ingredients.map((ingredient, index) => (
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems="center"
              key={index}
              gap={1}
            >
              <TextField
                required
                label={`Ingredient Name ${index + 1}`}
                variant="filled"
                name={`ingredientName-${index}`}
                fullWidth
                placeholder="Enter your Ingredient name"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
              />
              <TextField
                required
                label={`Ingredient Quantity ${index + 1}`}
                variant="filled"
                name={`ingredientQuantity-${index}`}
                fullWidth
                placeholder="Enter your Ingredient quantity"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, "quantity", e.target.value)
                }
              />
              {index > 0 && ( // Show remove button only for rows after the first one
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeIngredient(index)}
                  sx={{ marginLeft: 1 }}
                >
                  -
                </Button>
              )}
            </Box>
          ))}
          <Box display="flex" justifyContent="flex-start">
            <Button
              variant="contained"
              onClick={addIngredient}
              sx={{ textTransform: "capitalize" }}
            >
              Add Row
            </Button>
          </Box>
          <TextField
            label={"Instructions"}
            variant="filled"
            multiline
            minRows={4}
            name="instructions"
            placeholder="Enter your Recipe instructions"
            fullWidth
            value={formData.instructions}
            onChange={handleChange}
          />
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems="center"
            gap={1}
          >
            <TextField
              label={`Difficulty`}
              variant="filled"
              name={`difficulty`}
              fullWidth
              placeholder="Enter your Recipe difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            />
            <TextField
              label={`Preparation Time`}
              variant="filled"
              name={`prepTime`}
              fullWidth
              placeholder="Enter your Recipe preparation time."
              value={formData.prepTime}
              onChange={handleChange}
            />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignItems="center"
            gap={1}
          >
            <TextField
              label={`Cooking Time`}
              variant="filled"
              name={`cookTime`}
              fullWidth
              placeholder="Enter your Recipe cooking time"
              value={formData.cookTime}
              onChange={handleChange}
            />
            <TextField
              label={`Servings`}
              variant="filled"
              name={`servings`}
              fullWidth
              type="number"
              placeholder="Enter your Recipe servings."
              value={formData.servings}
              onChange={handleChange}
            />
          </Box>
          <TextField
            label={`Tags`}
            variant="filled"
            name={`tags`}
            fullWidth
            placeholder="Enter your Recipe tags."
            value={formData.tags}
            helperText={
              "Put comma seperated text to add multiple tags for your recipe. Ex - Delicious, Tasty"
            }
            onChange={handleChange}
          />
          <Typography>Nutritional Information</Typography>
          <Grid2 container spacing={1}>
            <Grid2 item sm={12} md={4}>
              <TextField
                label={`Calories`}
                variant="filled"
                name={`calories`}
                fullWidth
                placeholder="Enter your Recipe calories."
                value={formData.calories}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item sm={12} md={4}>
              <TextField
                label={`Protein`}
                variant="filled"
                name={`protein`}
                fullWidth
                placeholder="Enter your Recipe nutritional values."
                value={formData.protein}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item sm={12} md={4}>
              <TextField
                label={`Carbohydrates`}
                variant="filled"
                name={`carbohydrates`}
                fullWidth
                placeholder="Enter your Recipe carbohydrate values."
                value={formData.carbohydrates}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2 item sm={12} md={4}>
              <TextField
                label={`Fat`}
                variant="filled"
                name={`fat`}
                fullWidth
                placeholder="Enter your Recipe fat."
                value={formData.fat}
                onChange={handleChange}
              />
            </Grid2>
          </Grid2>
          <Stack direction={"row"} gap={2} flexWrap={"wrap"} mt={2}>
            {uploadedMedia.map((media, index) => {
              return (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    position: "relative",
                    width: "60px",
                    height: "60px",
                  }}
                >
                  <Tooltip title={"Delete"}>
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: -10,
                        right: -10,
                        zIndex: 10,
                        backgroundColor: "grey",
                        height: "25px",
                        width: "25px",
                        color: "#fff",
                        ":hover": {
                          backgroundColor: "#000",
                          color: "#fff",
                        },
                      }}
                      onClick={() => {
                        setUploadedMedia((prev) => {
                          const newFiles = [...prev];
                          newFiles.splice(index, 1);
                          return newFiles;
                        });
                      }}
                    >
                      <Close fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <img
                    src={media.file}
                    alt="media"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "5px",
                      objectFit: "cover",
                      border: "1px solid grey",
                    }}
                  ></img>
                </Paper>
              );
            })}
          </Stack>
          <Button
            component="label"
            role={undefined}
            size="small"
            variant="contained"
            tabIndex={-1}
            fullWidth={false}
            // disabled={uploadedMedia.length >= 10}
            // endIcon={<CameraAlt />}
            sx={{
              backgroundColor: "#4771AB",
              color: "#fff",
              fontWeight: "500",
              ":hover": {
                color: "#000",
                backgroundColor: "#fff",
              },
            }}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileUpload}
              multiple
            />
          </Button>

          <Box display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? "Submitting" : "Submit Recipe"}
            </Button>
          </Box>
        </Stack>
      </form>
    </Grid2>
  );
};

export default AddRecipe;
