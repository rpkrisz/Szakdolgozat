import {ChangeEvent, FC} from "react";

const TextInput: FC<{
  name: string;
  type?: string;
  label: string;
  inputData: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}> = ({name, type, label, inputData, handleChange, placeholder, required = false, disabled, className}) => {
  return (
    <label className={`form-control justify-start flex-grow ${className}`}>
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <input
        type={type ?? "text"}
        name={name}
        className="input input-bordered w-full text-base-content"
        placeholder={placeholder}
        value={inputData ?? ""}
        onChange={e => handleChange(e)}
        required={required}
        disabled={disabled}
      />
    </label>
  );
};
export default TextInput;
