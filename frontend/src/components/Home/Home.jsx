import { Box, Grid2, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <Grid2 sx={{ color: "#fff" }}>
      <Box>
        <Box>
          <Box mb={2} display={"flex"} flexDirection={"column"} gap={1}>
            <Typography variant="body" className={styles.heroHead}>
              Nextlevel Recipies for NextLevel Foodies
            </Typography>
            <Typography variant="body" sx={{ fontSize: "2rem" }}>
              Taste and Share food from around the world
            </Typography>
          </Box>
          <Stack direction={"row"} gap={1}>
            <Link to={"/addRecipe"} className={styles.link}>
              Add Recipes to your collection
            </Link>
            <Link to={"/recipes"} className={styles.link}>
              Explore Meals
            </Link>
          </Stack>
        </Box>
      </Box>
      <Stack direction={"column"} gap={4} mt={2}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"2rem"}
          textAlign={"center"}
        >
          <Typography variant="body" sx={{ fontSize: "2.5rem" }}>
            How it works
          </Typography>
          <Typography variant="body" sx={{ fontSize: "1.5rem" }}>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes,
            and to connect with other food lovers.
          </Typography>
          <Typography variant="body" sx={{ fontSize: "1.5rem" }}>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </Typography>
        </Box>

        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"2rem"}
          textAlign={"center"}
        >
          <Typography Typography variant="body" sx={{ fontSize: "2.5rem" }}>
            Why NextLevel Food?
          </Typography>
          <Typography variant="body" sx={{ fontSize: "1.5rem" }}>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes,
            and to connect with other food lovers.
          </Typography>
          <Typography variant="body" sx={{ fontSize: "1.5rem" }}>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </Typography>
        </Box>
      </Stack>
    </Grid2>
  );
};

export default Home;
