import {ChangeEvent, FC} from "react";

const NumberInput: FC<{
  name: string;
  label: string;
  inputData: number;
  handelChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  step?: number;
  required?: boolean;
}> = ({name, label, inputData, handelChange, placeholder, step = 1, required = false}) => {
  return (
    <label className="form-control justify-start flex-grow">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <input
        type="number"
        name={name}
        className="input input-bordered w-full"
        placeholder={placeholder}
        value={inputData ?? ""}
        onChange={e => handelChange(e)}
        step={step}
        required={required}
      />
    </label>
  );
};
export default NumberInput;
