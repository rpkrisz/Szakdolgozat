import {ChangeEvent, FC} from "react";

const TextArea: FC<{
  name: string;
  label: string;
  inputData: string;
  handelChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
}> = ({name, label, inputData, handelChange, placeholder, required = false}) => {
  return (
    <label className="form-control justify-start flex-grow">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <textarea
        name={name}
        className="textarea textarea-bordered  w-full "
        placeholder={placeholder}
        value={inputData ?? ""}
        onChange={e => handelChange(e)}
        required={required}
      ></textarea>
    </label>
  );
};
export default TextArea;
