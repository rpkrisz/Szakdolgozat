import {ChangeEvent, FC} from "react";

const DateInput: FC<{
  name: string;
  label: string;
  inputData: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}> = ({name, label, inputData, handleChange, placeholder, required, className}) => {
  return (
    <label className={`form-control justify-start flex-grow ${className}`}>
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <input
        type="date"
        name={name}
        className="input input-bordered w-full text-base-content"
        placeholder={placeholder}
        value={inputData ?? 0}
        onChange={e => handleChange(e)}
        required={required}
      />
    </label>
  );
};
export default DateInput;
