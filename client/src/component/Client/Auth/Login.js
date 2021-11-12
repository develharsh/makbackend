import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import { useAlert } from "react-alert";
import {
  login,
  clearErrors,
  clearMessages,
} from "../../../actions/clientActions";
import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, client, message, error } = useSelector(
    (state) => state.client
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (client) {
      if (message) {
        alert.success(message);
        dispatch(clearMessages());
      }
      navigate("/");
    }
  }, [dispatch, error, alert, message, client, navigate]);
  const [values, setValues] = useState({
    ID: "",
    password: "",
  });
  const { ID, password } = values;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    if (!ID) return alert.error("Email or Phone can't be empty.");
    if (!password) return alert.error("Password can't be empty.");
    dispatch(login(ID, password));
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Login | Alasca Fashion" />
          <div style={{ height: "6vh" }}></div>
          <Typography
            variant="h6"
            display="block"
            sx={{ textAlign: "center", marginBottom: "32px" }}
            gutterBottom
          >
            Login
          </Typography>
          <div className="mainDiv">
            <Stack>
              <FormControl className="formControl">
                <Input
                  type="text"
                  placeholder="Email or Phone"
                  className="input"
                  name="ID"
                  value={ID}
                  onChange={(e) => handleChange(e)}
                  startAdornment={
                    <InputAdornment position="start">
                      <PersonIcon color="secondary" />
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl className="formControl">
                <Input
                  type="password"
                  placeholder="Password"
                  className="input"
                  sx={{ marginBottom: "9px" }}
                  name="password"
                  value={password}
                  onChange={(e) => handleChange(e)}
                  startAdornment={
                    <InputAdornment position="start">
                      <VpnKeyIcon color="secondary" />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Typography
                variant="caption"
                display="block"
                sx={{ textAlign: "center", marginBottom: "41px" }}
                gutterBottom
              >
                Your information is always safe with us :)
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                endIcon={<LoginIcon />}
                sx={{ marginTop: "10px" }}
                onClick={handleSubmit}
              >
                Login
              </Button>
              <Link
                to="/c/signup"
                className="Link mt-2 textCenter fontwb"
                style={{ color: "tomato" }}
              >
                <p>New User? Signup</p>
              </Link>
            </Stack>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
