import { createBrowserRouter } from "react-router-dom";
import "./index.css";
import Signup from "./Components/Auth/Signup.jsx";
import App from "./App.jsx";
import Recipes from "./components/Recipes/Recipes.jsx";
import Home from "./components/Home/Home.jsx";
import ProtectedRoute from "./config/ProtectedRoute.jsx";
import Signin from "./components/Auth/Signin.jsx";
import AddRecipe from "./components/AddRecipes/AddRecipe.jsx";
import RecipeDetail from "./components/Recipes/SingleRecipe.jsx";
// import Error from "./Components/404error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "recipes",
        element: (
          <ProtectedRoute>
            <Recipes />
          </ProtectedRoute>
        ),
      },
      {
        path: "addRecipe",
        element: (
          <ProtectedRoute>
            <AddRecipe />
          </ProtectedRoute>
        ),
      },
      {
        path: "recipe/:id",
        element: (
          <ProtectedRoute>
            <RecipeDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
  // { path: "*", element: <Error /> },
]);

export default router;
