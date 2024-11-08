import logo from "/assets/logo.png";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Stack,
  Typography,
} from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, signout } from "../../Redux/authReducer";
import { useState } from "react";
import toast from "react-hot-toast";

// import { useState } from "react";

//Navbar component
const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { isAuthenticated, userName } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    localStorage.clear();
    dispatch(signout());
    toast.success("You have been logged out successfully", "success");
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "transparent",
        height: "5rem",
        backdropFilter: "blur(10px)",
      }}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Link
            to={"/home"}
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              style={{ height: "70px", aspectRatio: 1 }}
              src={logo}
              alt="logo"
            />
            <Typography
              variant={"body"}
              fontWeight={"bold"}
              sx={{ color: "#fff", fontSize: "30px" }}
            >
              Foodies
            </Typography>
          </Link>
          {isAuthenticated && (
            <Stack direction={"row"} gap={3}>
              <NavLink
                to={"/recipes"}
                style={({ isActive }) =>
                  isActive
                    ? {
                        fontWeight: "bold",
                        textDecoration: "none",
                        color: "#ff8a05",
                      }
                    : {
                        textDecoration: "none",
                        color: "#fff",
                        fontWeight: "bold",
                      }
                }
              >
                <Typography variant="body">Recipes</Typography>
              </NavLink>
              {/* <NavLink
              to={"/community"}
              style={({ isActive }) =>
                isActive
                  ? {
                      fontWeight: "bold",
                      textDecoration: "none",
                      color: "#ff8a05",
                    }
                  : {
                      textDecoration: "none",
                      fontWeight: "bold",
                      color: "#fff",
                    }
              }
            >
              <Typography variant="body">Go to Community</Typography>
            </NavLink> */}
            </Stack>
          )}
          {isAuthenticated && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userName}
                    src="/static/images/avatar/1.jpg"
                    sx={{ height: "40px", width: "40px" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    navigate("/home");
                    handleCloseUserMenu();
                  }}
                >
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
