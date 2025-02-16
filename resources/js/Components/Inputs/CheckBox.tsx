import {ChangeEvent, FC} from "react";

const CheckBox: FC<{
  name: string;
  label: string;
  inputData: boolean;
  handelChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}> = ({name, label, inputData, handelChange, placeholder}) => {
  return (
    <label className="label cursor-pointer flex-grow">
      {label && <span className="label-text">{label}</span>}
      <input
        type="checkbox"
        name={name}
        className="checkbox"
        placeholder={placeholder}
        onChange={e => handelChange(e)}
        checked={inputData ?? false}
      />
    </label>
  );
};
export default CheckBox;
