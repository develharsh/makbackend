import { Fragment } from "react";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { useSelector } from "react-redux";

const Home = () => {
  const { loading } = useSelector((state) => state.auth);
  return (
    <Fragment>
      <MetaData title="Home Alasaca" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h1>Homme</h1>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
