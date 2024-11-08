import RecipeModel from "./recipe.schema.js";

class RecipeRepository {
  constructor() {}

  async createRecipe(data, uploadedMedia, id) {
    const recipe = await RecipeModel.create({
      ...data,
      images: uploadedMedia,
      createdBy: id,
    });
    return recipe;
  }

  async updateRecipie(id, data) {
    const recipe = await RecipeModel.findByIdAndUpdate(id, data, { new: true });
    return recipe;
  }

  async getRecipe(id, userId) {
    const recipe = await RecipeModel.findOne({ _id: id, createdBy: userId });
    return recipe;
  }

  async getAllRecipies(skip, limit, id) {
    const recipies = await RecipeModel.find({ createdBy: id })
      .skip(skip)
      .limit(limit);
    return recipies;
  }

  async deleteRecipe(id) {
    const recipe = await RecipeModel.deleteOne({ _id: id });
    return recipe;
  }
}

export default RecipeRepository;
