import { ProgressBar } from "react-loader-spinner";
import "./Loader.module.css"

const Loader = () => {
  return (
    <ProgressBar
      visible={true}
      height="80"
      width="80"
      ariaLabel="progress-bar-loading"
      wrapperStyle={{}}
      wrapperClass="custom-progress-bar"
    />
  );
};

export default Loader;
