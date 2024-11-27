import { DataDisplay } from "../DataDisplay/DataDisplay";
import PropTypes from "prop-types";
import "./KeyGenerator.css";

export const KeyGenerator = (props) => {
  const { data, buttonText, onChange } = props;

  const getRandomHex = () => {
    onChange(
      [...Array(16)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("")
        .toUpperCase()
    );
  };
  return (
    <div className="horizontal-container">
      <button className="keygen-button" onClick={getRandomHex}>
        {buttonText}
      </button>
      <DataDisplay data={data} isHex />
    </div>
  );
};

KeyGenerator.propTypes = {
  data: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};
