import { uploadMultipleImages } from "../../servies/uploadImg.js";
import RecipeRepository from "./recipe.repository.js";

class RecipeController {
  constructor() {
    this.recipeRepository = new RecipeRepository();
  }

  async createRecipe(req, res, next) {
    const id = req.userId;
    const data = req.body;
    const mediaFiles = req.files.uploads || null;

    try {
      let uploadedMedia = [];
      if (mediaFiles) {
        const result = await uploadMultipleImages(mediaFiles, "RecipeImages");
        if (result.success) {
          uploadedMedia = result.results;
        }
      }
      const recipe = await this.recipeRepository.createRecipe(
        data,
        uploadedMedia,
        id
      );
      if (!recipe) {
        return res.status(400).send({
          success: false,
          message: "Some error occured. Recipe cannot be created",
        });
      }
      //Need to add this recipie to user code
      return res.status(201).send({
        success: true,
        message: "Recipe created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async updateRecipe(req, res, next) {
    const data = req.body;
    const { id } = req.params;
    console.log(data);
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Recipe ID is required" });
    }
    try {
      const recipe = await this.recipeRepository.updateRecipie(id, data);

      return res.status(200).json({
        success: true,
        data: recipe,
        message: "Recipe updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getRecipe(req, res, next) {
    const { id } = req.params;
    const userId = req.userId;
    if (!id || id == "") {
      return res.status(404).send({
        success: false,
        message:
          "Invalid or missing Recipe Id. Please try again with valid Recipe Id",
      });
    }
    try {
      const recipe = await this.recipeRepository.getRecipe(id, userId);
      if (!recipe) {
        return res.status(404).send({
          success: false,
          message: "Recipe not Found. Please check the id and try again",
        });
      }
      return res.status(200).send({
        success: true,
        data: recipe,
        message: "Recipe found successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllRecipes(req, res, next) {
    const { page, limit } = req.query;
    const id = req.userId;
    let pageNo = page || 0;
    let limitPerPage = limit || 10;
    let skip = pageNo * limitPerPage;
    try {
      const recipes = await this.recipeRepository.getAllRecipies(
        skip,
        limitPerPage,
        id
      );
      if (!recipes) {
        return res.status(404).send({
          success: false,
          message: "Recipes not Found. Please check the id and try again",
        });
      }
      return res.status(200).send({
        success: true,
        data: recipes,
        message: "Recipe found successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteRecipe(req, res, next) {
    const { id } = req.params;
    if (!id || id == "") {
      return res.status(400).send({
        success: false,
        message:
          "Invalid Id or recipe Id is missing. Please check the recipe id and request again.",
      });
    }
    try {
      const recipe = await this.recipeRepository.deleteRecipe(id);
      if (!recipe.acknowledged) {
        return res.status(404).send({
          success: false,
          message: "Recipe not found, Please check the id and request again",
        });
      }
      return res.status(200).send({
        success: true,
        message: "Recipe deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default RecipeController;
