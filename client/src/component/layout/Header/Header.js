import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { logOut } from "../../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Fragment } from "react";
import MainDrawer from "../Drawer/MainDrawer";
import { SHOW_MAIN_DRAWER } from "../../../constants/designConstants";

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const handleLogout = (e) => {
    dispatch(logOut());
    alert.info("Logged Out.");
  };
  return (
    <Fragment>
      <MainDrawer />
      <Fragment>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" color="secondary">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 1 }}
                onClick={(e) => dispatch({ type: SHOW_MAIN_DRAWER })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="p" component="div" sx={{ flexGrow: 1 }}>
                <Link
                  to="/"
                  className="Link white"
                  style={{ fontSize: "20px" }}
                >
                  Alasca Fashion
                </Link>
              </Typography>
              {isAuthenticated ? (
                <Button
                  color="error"
                  onClick={handleLogout}
                  variant="contained"
                >
                  Log out
                </Button>
              ) : (
                <Link to="/c/signup" className="Link white">
                  <AccountBoxIcon />
                </Link>
              )}
            </Toolbar>
          </AppBar>
          <div style={{ height: "55px" }}></div>
        </Box>
      </Fragment>
    </Fragment>
  );
};

export default Header;
