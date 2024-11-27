import PropTypes from "prop-types";
import "./RadioSelect.css";

export const RadioSelect = (props) => {
  const { items, legend, isHorizontal, selectedItem, onChange } = props;

  return (
    <form>
      <fieldset
        className={
          isHorizontal ? "radio-select-horizontal" : "radio-select-vertical"
        }
        id="legend"
      >
        <legend>{legend}</legend>
        {items.map((item, index) => {
          return (
            <div key={item.value} className="radio-select-item">
              <input
                type="radio"
                id={item.value}
                name={"name"}
                value={item.value}
                checked={item.value === selectedItem}
                onChange={(e) => onChange(e.target.value)}
              />
              <label htmlFor={index}>{item.label}</label>
            </div>
          );
        })}
      </fieldset>
    </form>
  );
};

RadioSelect.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItem: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  legend: PropTypes.string.isRequired,
  isHorizontal: PropTypes.bool,
};
