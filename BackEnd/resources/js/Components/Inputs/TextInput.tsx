import {ChangeEvent, FC} from "react";

const TextInput: FC<{
  name: string;
  label: string;
  inputData: string;
  handelChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}> = ({name, label, inputData, handelChange, placeholder, required = false, disabled}) => {
  return (
    <label className="form-control justify-start flex-grow">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <input
        type="text"
        name={name}
        className="input input-bordered w-full "
        placeholder={placeholder}
        value={inputData ?? ""}
        onChange={e => handelChange(e)}
        required={required}
        disabled={disabled}
      />
    </label>
  );
};
export default TextInput;
