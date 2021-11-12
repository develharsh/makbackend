import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useAlert } from "react-alert";
import {
  signup,
  clearErrors,
  clearMessages,
} from "../../../actions/clientActions";
import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = () => {
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
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const { name, email, phone, password } = values;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    if (!name) return alert.error("Name can't be empty.");
    if (name.length > 30)
      return alert.error("Name length can't exceed 30 letters.");
    if (!email.includes("@")) return alert.error("Invalid Email.");
    if (phone.length !== 10)
      return alert.error("Enter 10 digit long phone number.");
    if (password.length < 8)
      return alert.error("Password must be atleast 8 letters.");
    dispatch(signup(name, email, phone, password));
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="New User | Signup" />
          <div style={{ height: "4vh" }}></div>
          <Typography
            variant="h6"
            display="block"
            sx={{ textAlign: "center", marginBottom: "20px" }}
            gutterBottom
          >
            New User
          </Typography>
          <div className="mainDiv">
            <Stack>
              <FormControl className="formControl">
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="input"
                  name="name"
                  value={name}
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
                  type="email"
                  placeholder="Your Email"
                  className="input"
                  name="email"
                  value={email}
                  onChange={(e) => handleChange(e)}
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailIcon color="secondary" />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl className="formControl">
                <Input
                  type="text"
                  placeholder="Your Phone"
                  className="input"
                  sx={{ marginBottom: "9px" }}
                  name="phone"
                  value={phone}
                  onChange={(e) => handleChange(e)}
                  startAdornment={
                    <InputAdornment position="start">
                      <PhoneIphoneIcon color="secondary" />
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
                endIcon={<PersonAddIcon />}
                sx={{ marginTop: "10px" }}
                onClick={handleSubmit}
              >
                Register
              </Button>
              <Link
                to="/c/login"
                className="Link mt-2 textCenter fontwb"
                style={{ color: "tomato" }}
              >
                <p>Already User? Login</p>
              </Link>
            </Stack>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Signup;
