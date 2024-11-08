import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import recipeRoutes from "./src/features/recipe/recipe.routes.js";
import cloudneryConfig from "./src/config/cloudnery.config.js";
import connectMongoDB from "./src/config/mongodb.config.js";
import userRoutes from "./src/features/user/user.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use(cors({ origin: "*" }));

app.use("/api/auth", userRoutes);
app.use("/api", recipeRoutes);

app.get("/", (req, res, next) => {
  res.status(200).send({ message: "Welcome" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.code === 11000) {
    return res.status(500).send({
      success: false,
      message: "Username is already is use",
    });
  }
  return res.status(500).send({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app is running on ${PORT} port`);
  cloudneryConfig();
  connectMongoDB();
});

export default app;
