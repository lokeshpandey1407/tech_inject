import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    name: { type: String, default: "", required: true },
    category: { type: String, default: "" },
    ingredients: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true },
        isOptional: { type: Boolean, default: false },
      },
    ],
    images: {
      type: [Object],
    },
    instructions: { type: String, default: "" },
    difficulty: { type: String, default: "" },
    prepTime: { type: String, default: "" },
    cookTime: { type: String, default: "" },
    servings: { type: Number },
    tags: { type: [String], default: [] },
    nutritionalInfo: {
      calories: { type: Number },
      protein: { type: String },
      carbohydrates: { type: String },
      fats: { type: String },
    },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
const RecipeModel = mongoose.model("Recipe", RecipeSchema);
export default RecipeModel;
