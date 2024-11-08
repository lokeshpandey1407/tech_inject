import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Edit, Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Recipe({ recipe, deleteRecipe }) {
  const { name, instructions, images } = recipe;
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345, minWidth: 320 }}>
      <CardMedia sx={{ height: 140 }} image={images[0]?.url} title={name} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          textTransform={"capitalize"}
        >
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {instructions}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button> */}
        <Button
          size="small"
          onClick={() => {
            navigate(`/recipe/${recipe._id}`);
          }}
        >
          View Recipe
        </Button>
        <Tooltip title="Edit Recipe">
          <IconButton>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Recipe">
          <IconButton onClick={() => deleteRecipe(recipe._id)}>
            <Delete />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
