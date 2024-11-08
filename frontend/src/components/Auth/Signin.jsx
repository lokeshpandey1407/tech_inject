import { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { API } from "../../config/utils";
// import { useToast } from "../../config/ToastContext";
import api from "../../config/Axios.config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, signin } from "../../Redux/authReducer";

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(authSelector);
  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    toast
      .promise(api.post(API.signin, formData), {
        loading: "Submitting your Recipe....",
        success: (data) => {
          console.log("data", data.data);
          if (data?.data?.success) {
            dispatch(
              signin({
                username: data?.data?.data?.username || "",
                token: data?.data?.token,
              })
            );
            navigate("/home");
            localStorage.setItem("auth_token", JSON.stringify(data.data.token));
            return data?.message || "Success"
          } else {
            return data?.message || "Server Error. Please try again";
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
    if (isAuthenticated) {
      navigate("/home");
    }
  }, []);
  return (
    <Box
      sx={{ backgroundColor: "white" }}
      p={5}
      mt={10}
      width={500}
      borderRadius={5}
    >
      <Typography variant="h5" mb={6} textAlign={"center"}>
        Sign In
      </Typography>
      <form onSubmit={handleSignin}>
        <Stack direction={"column"} gap={2}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            type="text"
            name="username"
            id="username"
            required
            sx={{ borderRadius: 20 }}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            id="password"
            name="password"
            required
          />
          <Button
            variant="outlined"
            disabled={isLoading}
            sx={{
              width: "fit-content",
              alignSelf: "center",
              textTransform: "none",
            }}
            type="submit"
          >
            {isLoading ? <CircularProgress size={30} /> : "Sign In"}
          </Button>
        </Stack>
      </form>
      <Typography mt={4} textAlign={"center"}>
        Do not have an account? <Link to={"/signup"}>Click here</Link> to Sign
        up.
      </Typography>
    </Box>
  );
};

export default Signin;
