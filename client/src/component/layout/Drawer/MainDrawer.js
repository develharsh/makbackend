import { Fragment } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
//import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_MAIN_DRAWER } from "../../../constants/designConstants";
import { Link } from "react-router-dom";

const MainDrawer = () => {
  const dispatch = useDispatch();
  const { mainDrawer } = useSelector((state) => state.design);
  const list = () => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={(e) => {
        dispatch({ type: HIDE_MAIN_DRAWER });
      }}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <CloseIcon className="red" />
          </ListItemIcon>
          <ListItemText primary="Close" className="red" />
        </ListItem>

        {/*<Divider />*/}

        <ListItem>
          <ListItemIcon>
            <HomeIcon className="black" />
          </ListItemIcon>
          <Link to="/" className="Link black">
            <ListItemText primary="Home Page" />
          </Link>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <AddIcon className="black" />
          </ListItemIcon>
          <Link to="/addProduct" className="Link black">
            <ListItemText primary="Add New Product" />
          </Link>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <Fragment>
      {
        <Drawer anchor={"right"} open={mainDrawer}>
          {list()}
        </Drawer>
      }
    </Fragment>
  );
};

export default MainDrawer;
