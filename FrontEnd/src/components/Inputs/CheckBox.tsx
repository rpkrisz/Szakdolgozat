import {ChangeEvent, FC} from "react";

const CheckBox: FC<{
  name: string;
  label: string;
  inputData: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}> = ({name, label, inputData, handleChange, placeholder}) => {
  return (
    <label className="label cursor-pointer flex-grow">
      {label && <span className="label-text">{label}</span>}
      <input
        type="checkbox"
        name={name}
        className="checkbox text-base-content"
        placeholder={placeholder}
        onChange={e => handleChange(e)}
        checked={inputData ?? false}
      />
    </label>
  );
};
export default CheckBox;
