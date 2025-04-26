import {ChangeEvent, FC} from "react";

const DateInput: FC<{
  name: string;
  label: string;
  inputData: string;
  handelChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}> = ({name, label, inputData, handelChange, placeholder, required}) => {
  return (
    <label className="form-control justify-start flex-grow">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <input
        type="date"
        name={name}
        className="input input-bordered w-full "
        placeholder={placeholder}
        value={inputData ?? 0}
        onChange={e => handelChange(e)}
        required={required}
      />
    </label>
  );
};
export default DateInput;
