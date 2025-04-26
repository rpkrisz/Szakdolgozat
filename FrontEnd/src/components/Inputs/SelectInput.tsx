import {ChangeEvent, FC} from "react";

const SelectInput: FC<{
  name: string;
  label: string;
  inputData: string | number;
  options: {value: string | number; text: string}[];
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}> = ({name, label, inputData, options, handleChange, required, disabled, className}) => {
  return (
    <label className={`form-control justify-start flex-grow min-w-96 ${className}`}>
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select
        className="select select-bordered flex items-center gap-2  w-full "
        name={name}
        value={inputData ? inputData : ""}
        onChange={e => handleChange(e)}
        required={required}
        disabled={disabled}
      >
        <option disabled value="">
          Choose a {label}
        </option>
        {options.map(({value, text}) => {
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
    </label>
  );
};
export default SelectInput;
