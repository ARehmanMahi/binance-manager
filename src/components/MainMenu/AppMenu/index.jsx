import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import useTransNavigate from "../../../hooks/useTransNavigate";

const AppMenu = ({logo}) => {
  const transNavigate = useTransNavigate();

  return (
    <>
      <Typography
        component="a"
        href="/"
        onClick={e => {
          e.preventDefault();
          transNavigate("/");
        }}
        sx={{
          mr: 2,
          display: {xs: "none", md: "flex"},
          textDecoration: "none",
        }}
      >
        <Box component="img" sx={{height: 44}} alt="logo" src={logo} />
      </Typography>
      <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
        <Button
          onClick={() => transNavigate("/faq")}
          sx={{my: 2, color: "white", display: "block"}}
        >
          FAQ btn
        </Button>

        <Button
          onClick={() => transNavigate("/about-us")}
          sx={{my: 2, color: "white", display: "block"}}
        >
          About Us btn
        </Button>
      </Box>
    </>
  );
};

AppMenu.propTypes = {
  logo: PropTypes.any
};

export default AppMenu;