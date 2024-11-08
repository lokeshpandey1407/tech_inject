import { Box, Typography } from "@mui/material";
import Recipe from "./Recipe";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../config/Axios.config";
import { API } from "../../config/utils";
import { Link } from "react-router-dom";
export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRecipes = () => {
    toast
      .promise(api.get(API.getRecipes), {
        loading: "Fetching...",
        success: (data) => {
          if (data?.data?.success) {
            setRecipes(data?.data?.data);
            return "Recipes Fetched succesfully.";
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

  const deleteRecipe = (id) => {
    toast
      .promise(api.delete(`/recipe/${id}`), {
        loading: "Deleting Recipe...",
        success: (data) => {
          if (data?.data?.success) {
            getRecipes();
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

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <Box display={"flex"} flexDirection={"row"} gap={4}>
      {recipes.length == 0 && (
        <Box textAlign={"center"}>
          <Typography sx={{ color: "#fff", marginBottom: "2rem" }}>
            No Recipies found. Try adding new Recipies
          </Typography>
          <Link
            style={{
              padding: ".5rem",
              backgroundColor: "#fff",
              textDecoration: "none",
              borderRadius: "5px",
            }}
            to="/addRecipe"
          >
            {" "}
            Add New Recipe
          </Link>
        </Box>
      )}
      {recipes.map((recipe, index) => {
        return (
          <Recipe key={index} recipe={recipe} deleteRecipe={deleteRecipe} />
        );
      })}
    </Box>
  );
}
