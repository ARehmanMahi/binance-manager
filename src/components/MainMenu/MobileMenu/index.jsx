import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import PropTypes from "prop-types";
import useTransNavigate from "../../../hooks/useTransNavigate";

const MobileManu = ({logo}) => {
  const transNavigate = useTransNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: {xs: "block", md: "none"},
          }}
        >
          <MenuItem onClick={() => {
            handleCloseNavMenu();
            transNavigate("/faq");
          }}
          >
            <Typography textAlign="center">FAQ.</Typography>
          </MenuItem>

          <MenuItem onClick={() => {
            handleCloseNavMenu();
            transNavigate("/about-us");
          }}
          >
            <Typography textAlign="center">About Us.</Typography>
          </MenuItem>
        </Menu>
      </Box>
      <Typography
        variant="h5"
        component="a"
        href="/"
        onClick={e => {
          e.preventDefault();
          transNavigate("/");
        }}
        sx={{
          mr: 2,
          display: {xs: "flex", md: "none"},
          textDecoration: "none",
          flexGrow: 1,
        }}
      >
        <Box component="img" sx={{height: 44}} alt="logo" src={logo} />
      </Typography>
    </>
  );
};

MobileManu.propTypes = {
  logo: PropTypes.any.isRequired,
};

export default MobileManu;