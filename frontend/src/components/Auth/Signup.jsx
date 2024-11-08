import { Link, useNavigate } from "react-router-dom";
import { API } from "../../config/utils";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import api from "../../config/Axios.config";
import toast from "react-hot-toast";
import { useState } from "react";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // const handleSignup = async (e) => {
  //   setIsLoading(true);
  //   const formData = new FormData(e.target);
  //   e.preventDefault();
  //   api
  //     .post(API.signup, formData)
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .then((data) => {
  //       if (data.success) {
  //         navigate("/");
  //         toast.success(data?.message || "Success", "success");
  //       } else {
  //         toast.error(
  //           data?.message || "Server Error. Please try again",
  //           "error"
  //         );
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error(
  //         err?.response?.data?.message || "Server Error. Please try again",
  //         "error"
  //       );
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    toast
      .promise(api.post(API.signup, formData), {
        loading: "Signing up...",
        success: (data) => {
          if (data.data.success) {
            navigate("/");
            return data.data.message || "Success";
          } else {
            throw new Error(
              data.data.message || "Server Error. Please try again"
            );
          }
        },
        error: (err) => {
          return (
            err?.response?.data?.message || "Server Error. Please try again"
          );
        },
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box
      sx={{ backgroundColor: "white" }}
      p={5}
      mt={8}
      width={500}
      borderRadius={5}
    >
      <Typography variant="h5" mb={6} textAlign={"center"}>
        Create Account
      </Typography>
      <form onSubmit={handleSignup}>
        <Stack direction={"column"} gap={2}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            type="text"
            id="name"
            name="name"
            required
          />
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            type="text"
            id="username"
            name="username"
            required
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
            {isLoading ? "Signing up..." : " Sign Up"}
          </Button>
        </Stack>
      </form>
      <Typography mt={4} textAlign={"center"}>
        Already have an account? <Link to={"/"}>Click here</Link> to Sign
      </Typography>
    </Box>
  );
};

export default Signup;
