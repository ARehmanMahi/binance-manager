import Container from "@mui/material/Container";
import {Outlet} from "react-router-dom";
import MainMenu from "../../components/MainMenu";

const Guest = () => {
  return (
    <Container>
      <MainMenu />

      <Outlet />
    </Container>
  );
};

export default Guest;