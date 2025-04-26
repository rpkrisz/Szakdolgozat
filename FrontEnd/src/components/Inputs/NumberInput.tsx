import {ChangeEvent, FC} from "react";

const NumberInput: FC<{
  name: string;
  label: string;
  inputData: number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  step?: number;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}> = ({name, label, inputData, handleChange, placeholder, step = 1, required = false, disabled = false, className}) => {
  return (
    <label className={`form-control justify-start flex-grow ${className}`}>
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <input
        type="number"
        name={name}
        className="input input-bordered w-full text-base-content"
        placeholder={placeholder}
        value={inputData ?? ""}
        onChange={e => handleChange(e)}
        step={step}
        required={required}
        disabled={disabled}
      />
    </label>
  );
};
export default NumberInput;
