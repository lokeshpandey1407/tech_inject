
import Router from "express";
import RecipeController from "./recipe.controller.js";


const recipeRoutes = Router();
const recipeController = new RecipeController();

recipeRoutes.post("/recipe", (req, res, next) => {
  recipeController.createRecipe(req, res, next);
});

recipeRoutes.get("/recipe", (req, res, next) => {
  recipeController.getAllRecipes(req, res, next);
});

recipeRoutes.get("/recipe/:id", (req, res, next) => {
  recipeController.getRecipe(req, res, next);
});

recipeRoutes.put("/recipe/:id", (req, res, next) => {
  recipeController.updateRecipe(req, res, next);
});

recipeRoutes.delete("/recipe/:id", (req, res, next) => {
  recipeController.deleteRecipe(req, res, next);
});

export default recipeRoutes;
