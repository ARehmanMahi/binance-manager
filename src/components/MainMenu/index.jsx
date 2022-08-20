import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import logo from "../../logo.svg";
import AppMenu from "./AppMenu";
import MobileMenu from "./MobileMenu";
import { useAuth } from "../../contexts/AuthContext";
import useTransNavigate from "../../hooks/useTransNavigate";

const MainMenu = () => {
  const transNavigate = useTransNavigate();
  const auth = useAuth();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AppMenu logo={logo} />

          <MobileMenu logo={logo} />

          {auth.user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={auth.user.displayName}
                    src={auth.user.photoURL}
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
                    handleCloseUserMenu();
                    transNavigate("/account");
                  }}
                >
                  <Typography textAlign="center">Account</Typography>
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    transNavigate("/profile");
                  }}
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>

                <MenuItem onClick={auth.logout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button onClick={auth.login} sx={{ my: 2, color: "white" }}>
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MainMenu;
